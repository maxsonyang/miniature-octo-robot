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

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  loginButton: {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    boxShadow: "none",
    marginTop: 50,
    padding: "15px 50px",
  },
  signUpButton: {
    color: "#3A8DFF",
    borderRadius: 8,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
    maxWidth: "fit-content",
    padding: "10px 50px",
  },
  welcomeHeader: {
    fontWeight: 600,
    fontSize: 24,
  },
  signUpHeader: {
    color: "#B1B1B1",
    fontSize: 12,
    textAlign: "center",
    height: 50,
    lineHeight: "50px",
  },
  signUpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
  },
  login: {
    margin: "auto 0"
  },
  formControl: {
    width: "100%"
  },
  label: {
    color: "#B1B1B1",
    fontSize: 12,
  },
  loginBox: {
    display: "flex",
    flexDirection: "column-reverse",
    height: "100vh",
    width: "80%"
  },
  banner: {
    backgroundImage: `linear-gradient(#3A8DFF, #86B9FF), url(${BannerBG})`,
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chatBubble: {
    width: 35,
    height: 35,
    display: "block",
    margin: "0 15px",
  },
  bannerText: {
    color: "#FFFFFF",
  }
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
    <Grid container justify="center">
      <div className={classes.banner}>
        <img className={classes.chatBubble} src={BubbleSVG} alt="logo"/>
        <p className={classes.bannerText}>
          Converse with anyone in any language
        </p>
      </div>
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
    </Grid>
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
