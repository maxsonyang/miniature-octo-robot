import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3A8DFF",
    borderRadius: "100vh",
    textAlign: "center",
    marginRight: "10px",
    padding: "2px 8px"
  },
  count: {
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 900,
  }
}));

const UnreadMessages = (props) => {
  const classes = useStyles();
  if (props.unread > 0) {
    return (
      <Box className={classes.root}>
        <Typography className={classes.count}>
          {props.unread}
        </Typography>
      </Box>
    )
  }
  return null;
}

export default UnreadMessages;