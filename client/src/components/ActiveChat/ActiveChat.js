import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const messages = conversation.messages;

  const [lastRead, updateLastRead] = useState(-1);

  useEffect(() => {
    updateLastRead(() => {
      if (!messages) {
        return -1;
      }
      for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i];
        if (message.senderId === user.id && message.read) {
          return message.id;
        }
      }
      return -1;
    });
  }, [messages, user.id]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              convo={conversation}
              userId={user.id}
              lastRead={lastRead}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              updateLastRead={updateLastRead}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
