import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import landingTheme from "./components/Landing/theme";
import BannerContainer from "./components/Landing/Banner";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  loginContainer: {
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
      width: "70%",
      maxHeight: "100%",
    }
  },
  forgotLink: {
    ...theme.typography,
    color: "#3A8DFF",
    fontSize: 12,
  },
}));

const Signup = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();
  const landingClasses = landingTheme();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <BannerContainer>
      <Grid className={classes.loginContainer} container item>
        <Typography className={landingClasses.secondaryHeader}>
          Need to log in?
        </Typography>
        <Button
          className={landingClasses.secondaryButton}
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </Grid>
      <form className={classes.form} onSubmit={handleRegister}>
        <Grid>
          <h1 className={landingClasses.primaryHeader}>Create an Account.</h1>
          <Grid>
            <FormControl className={landingClasses.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                InputProps={{
                  classes: { underline: landingClasses.underline },
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl className={landingClasses.formControl}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                InputProps={{
                  classes: { underline: landingClasses.underline },
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={landingClasses.formControl}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                InputProps={{
                  classes: { underline: landingClasses.underline },
                }}
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid className={classes.buttonContainer}>
            <Button
              className={landingClasses.primaryButton}
              type="submit"
              variant="contained"
              size="large"
            >
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
