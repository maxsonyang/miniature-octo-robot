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
import { register } from "./store/utils/thunkCreators";
import landingTheme from "./themes/landingTheme";
import BannerContainer from "./components/Landing/Banner";

const Signup = (props) => {
  const history = useHistory();
  const landingClasses = landingTheme();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <BannerContainer>
      <Grid className={landingClasses.root} container item>
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
      <form className={landingClasses.form} onSubmit={handleRegister}>
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
                  classes: {
                    underline: landingClasses.underline,
                    input: landingClasses.textField,
                  },
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
                  classes: {
                    underline: landingClasses.underline,
                    input: landingClasses.textField,
                  },
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
                  classes: {
                    underline: landingClasses.underline,
                    input: landingClasses.protectedField,
                  },
                }}
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={landingClasses.formControl}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                InputProps={{
                  classes: {
                    underline: landingClasses.underline,
                    input: landingClasses.protectedField,
                  },
                }}
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container className={landingClasses.buttonContainer}>
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
