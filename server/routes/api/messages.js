const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const activeConversations = require("../../activeConvo");
const clientIds = require("../../clientIDs");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender } = req.body;
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (clientIds[sender.id]) {
        sender.online = true;
      }
    } else {
      // Update the conversation's 'updatedAt' field to reflect the addition of a new message
      conversation.changed('updatedAt', true);
      await conversation.save();
    }

    const otherUser =
      senderId === conversation.user1Id
        ? conversation.user2Id
        : conversation.user1Id;

    const read = activeConversations[otherUser] === senderId;

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read
    });
    
    res.json({ message, sender, read });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
