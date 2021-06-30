import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import BannerBG from "./assets/bg-img.png";
import BubbleSVG from "./assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  loginButton: {
    ...theme.typography.button,
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    boxShadow: "none",
    marginTop: 50,
    padding: "15px 50px",
    "&:focus": {
      boxShadow: "none",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      fontWeight: 700,
    }
  },
  signUpButton: {
    color: "#3A8DFF",
    borderRadius: 8,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
    maxWidth: "fit-content",
    padding: "10px 50px",
    [theme.breakpoints.up('md')]: {
      marginLeft: 30,
      height: 60
    }
  },
  welcomeHeader: {
    ...theme.typography,
    fontWeight: 600,
    fontSize: 24,
    [theme.breakpoints.up('md')]: {
      fontSize: 32,
    }
  },
  signUpHeader: {
    ...theme.typography,
    color: "#B1B1B1",
    fontSize: 12,
    textAlign: "center",
    height: 50,
    lineHeight: "50px",
    [theme.breakpoints.up('md')]: {
      fontSize: 14
    }
  },
  signUpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
      padding: "20px 40px",
      justifyContent: "flex-end",
    }
  },
  login: {
    margin: "auto 0",
    [theme.breakpoints.up('md')]: {
      margin: "10vh 0",
      width: "60%",
    }
  },
  formControl: {
    width: "100%",
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid #E0E0E0"
    },
    "&:not(.Mui-disabled):hover::before": {
      borderBottom: "2px solid #86B9FF"
    },
    "&:after": {
      borderBottom: "2px solid #3A8DFF"
    }
  },
  forgotLink: {
    ...theme.typography,
    color: "#3A8DFF",
    fontSize: 12,
  },
  label: {
    color: "#B1B1B1",
    fontSize: 12,
  },
  loginBox: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    height: "92vh",
    width: "80%",
    [theme.breakpoints.up('md')]: {
      flexDirection: "column",
      width: "65%",
      height: "100vh",
      margin: "auto",
    }
  },
  banner: {
    backgroundImage: `linear-gradient(#3A8DFF, #86B9FF), url(${BannerBG})`,
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
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
    [theme.breakpoints.up('md')]: {
      width: 64,
      height: 64,
    }
  },
  bannerText: {
    color: "#FFFFFF",
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
      width: "50%",
      textAlign: "center",
    }
  },
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.container} container justify="center">
      <Box className={classes.banner}>
        <img className={classes.chatBubble} src={BubbleSVG} alt="logo" />
        <p className={classes.bannerText}>
          Converse with anyone with any language
        </p>
      </Box>
      <Box className={classes.loginBox}>
        <Grid className={classes.signUpContainer} container item>
          <Typography className={classes.signUpHeader}>
            Don't have an account?
          </Typography>
          <Button
            className={classes.signUpButton}
            onClick={() => history.push("/register")}
          >
            Create Account
          </Button>
        </Grid>
        <form className={classes.login} onSubmit={handleLogin}>
          <Grid>
            <h1 className={classes.welcomeHeader}>Welcome Back!</h1>
            <Grid>
              <FormControl
                className={classes.formControl}
                margin="normal"
                required
              >
                <TextField
                  aria-label="username"
                  label="E-mail Address"
                  name="username"
                  type="text"
                  InputProps={{
                    classes: { underline: classes.underline },
                  }}
                />
              </FormControl>
            </Grid>
            <FormControl
              className={classes.formControl}
              margin="normal"
              required
            >
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
                InputProps={{
                  endAdornment: (
                    <Button className={classes.forgotLink}>Forgot?</Button>
                  ),
                  classes: { underline: classes.underline },
                  style: {
                    fontSize: 28,
                  },
                }}
              />
            </FormControl>
            <Grid className={classes.buttonContainer}>
              <Button
                className={classes.loginButton}
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
