const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [
        ["updatedAt", "DESC"],
        [Message, "createdAt", "ASC"],
      ],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();
      // set a property "otherUser" so that frontend will have easier access
      // also get the last read ID of the current user
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const messages = convoJSON.messages;

      convoJSON.latestMessageText = messages[messages.length - 1].text;

      const unreadCount = messages.reduce((total, msg) => {
        if (msg.senderId === convoJSON.otherUser.id ) {
          return total + (1 - msg.read);
        }
        return total;
      }, 0);
      convoJSON.unreadCount = unreadCount;

      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.post("/read", async(req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const otherId = req.body.otherUser.id;
    const convo = await Conversation.findConversation(userId, otherId);
    const convoJSON = convo.toJSON();
    const messages = convoJSON.messages;
    
    for (let msg_i = messages.length - 1; msg_i >= 0; msg_i--) {
      const message = messages[msg_i];
      // Stop updating read messages if we encounter our own or a read message.
      if (message.senderId === userId || message.read) {
        break;
      } else {
        const message_record = convo.messages[msg_i];
        message_record.read = true;
        await message_record.save();
      }
    }

    res.status(200);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
