import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import BannerContainer from "./components/Landing/Banner";
import landingTheme from "./components/Landing/theme";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  signUpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
    [theme.breakpoints.up('landscape')]: {
      flexDirection: "row",
      padding: "10px 40px 0 40px",
      justifyContent: "flex-end",
      marginBottom: 0,
    }
  },
  form: {
    margin: "auto 0",
    [theme.breakpoints.up('landscape')]: {
      margin: 0,
      width: "75%",
      maxHeight: "80%",
    }
  },
  forgotLink: {
    ...theme.typography,
    color: "#3A8DFF",
    fontSize: 12,
  },
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();
  const landingClasses = landingTheme();
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
    <BannerContainer>
      <Grid className={classes.signUpContainer} container item>
        <Typography className={landingClasses.secondaryHeader}>
          Don't have an account?
        </Typography>
        <Button
          className={landingClasses.secondaryButton}
          onClick={() => history.push("/register")}
        >
          Create Account
        </Button>
      </Grid>
      <form className={classes.form} onSubmit={handleLogin}>
        <Grid>
          <h1 className={landingClasses.primaryHeader}>Welcome Back!</h1>
          <Grid>
            <FormControl
              className={landingClasses.formControl}
              margin="normal"
              required
            >
              <TextField
                aria-label="username"
                label="E-mail Address"
                name="username"
                type="text"
                InputProps={{
                  classes: { 
                    input: landingClasses.textField,
                    underline: landingClasses.underline 
                  },
                }}
              />
            </FormControl>
          </Grid>
          <FormControl className={landingClasses.formControl} margin="normal" required>
            <TextField
              label="password"
              aria-label="password"
              type="password"
              name="password"
              InputProps={{
                endAdornment: (
                  <Button className={classes.forgotLink}>Forgot?</Button>
                ),
                classes: { 
                  input: landingClasses.textField,
                  underline: landingClasses.underline 
                },
              }}
            />
          </FormControl>
          <Grid className={classes.buttonContainer}>
            <Button
              className={landingClasses.primaryButton}
              type="submit"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </BannerContainer>
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
