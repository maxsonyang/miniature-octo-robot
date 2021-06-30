import React from 'react';
import {
  Box,
} from "@material-ui/core";
import BannerBG from "../../assets/bg-img.png";
import BubbleSVG from "../../assets/bubble.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up('landscape')]: {
      flexDirection: "row",
    }
  },
  banner: {
    backgroundImage: `linear-gradient(#3A8DFF, #86B9FF), url(${BannerBG})`,
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.up('landscape')]: {
      flexDirection: "column",
      justifyContent:"center",
      width: "40%",
      height: "100vh",
    }
  },
  chatBubble: {
    width: 32,
    height: 32,
    display: "block",
    margin: "0 15px",
    [theme.breakpoints.up('landscape')]: {
      width: 48,
      height: 48,
    }
  },
  bannerText: {
    color: "#FFFFFF",
    [theme.breakpoints.up('landscape')]: {
      fontSize: 18,
      width: "50%",
      textAlign: "center",
    }
  },
  contentBox: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    height: "92vh",
    width: "80%",
    [theme.breakpoints.up('landscape')]: {
      flexDirection: "column",
      width: "65%",
      height: "100vh",
      margin: "auto",
    }
  },
}));

const BannerContainer = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} justify="center">
      <Box className={classes.banner}>
        <img className={classes.chatBubble} src={BubbleSVG} alt="logo" />
        <p className={classes.bannerText}>
          Converse with anyone with any language
        </p>
      </Box>
      <Box className={classes.contentBox}>{props.children}</Box>
    </Box>
  );
}

export default BannerContainer;