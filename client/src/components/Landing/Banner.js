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
    backgroundSize: 'cover',
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.up('landscape')]: {
      flexDirection: "column",
      justifyContent:"center",
      maxWidth: "40%",
      height: "100vh",
      backgroundImage: `url(${BannerBG})`,
    }
  },
  mask:{
    width: "100%",
    height: "8vh",
    position: "absolute",
    zIndex: 0,
    background: "linear-gradient(rgba(58, 141, 255, 1), rgba(134, 185, 255, 1))",
    [theme.breakpoints.up('landscape')]: {
      maxWidth: "40%",
      height: "100%",
      background: "linear-gradient(rgba(58, 141, 255, .8), rgba(134, 185, 255, 1))",
    }
  },
  chatBubble: {
    width: 32,
    height: 32,
    display: "block",
    margin: "0 15px",
    zIndex: 100,
    [theme.breakpoints.up('landscape')]: {
      width: 48,
      height: 48,
    }
  },
  bannerText: {
    color: "#FFFFFF",
    zIndex: 100,
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
        <Box className={classes.mask}>
        </Box>
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