import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { updateActiveConvo, markMessagesAsRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";
import UnreadMessages from "./UnreadMessages";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.updateActiveConvo({
      username: conversation.otherUser.username,
      id: conversation.otherUser.id,
    });
    await this.props.markMessagesAsRead(conversation);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unreadMessages = this.props.conversation.unreadCount;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} unread={unreadMessages} />
        <UnreadMessages unread={unreadMessages} />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveConvo: (data) => {
      dispatch(updateActiveConvo(data));
    },
    markMessagesAsRead: (user) => {
      dispatch(markMessagesAsRead(user));
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
