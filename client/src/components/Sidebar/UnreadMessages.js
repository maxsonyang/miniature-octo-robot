import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "100vh",
    textAlign: "center",
    marginRight: theme.spacing(2),
    padding: theme.spacing(.25, 1),
  },
  count: {
    color: "#FFFFFF",
    fontSize: theme.typography.unread.fontSize,
    fontWeight: 900,
  }
}));

const UnreadMessages = (props) => {
  
  const classes = useStyles();

  return (
    props.unread > 0 && 
    <Box className={classes.root}>
      <Typography className={classes.count}>
        {props.unread}
      </Typography>
    </Box>
  )
}

export default UnreadMessages;