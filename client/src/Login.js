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
import { login } from "./store/utils/thunkCreators";
import BannerContainer from "./components/Landing/Banner";
import landingTheme from "./themes/landingTheme";


const Login = (props) => {
  const history = useHistory();
  const landingClasses = landingTheme();
  const { user, login } = props;
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
      <Grid className={landingClasses.root} container item>
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
      <form className={landingClasses.form} onSubmit={handleLogin}>
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
                    underline: landingClasses.underline,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <FormControl
            className={landingClasses.formControl}
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
                  <Button className={landingClasses.secondaryLink}>
                    Forgot?
                  </Button>
                ),
                classes: {
                  input: landingClasses.protectedField,
                  underline: landingClasses.underline,
                },
              }}
            />
          </FormControl>
          <Grid container className={landingClasses.buttonContainer}>
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
