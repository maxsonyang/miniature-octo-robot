import { makeStyles } from "@material-ui/core/styles";

const landingTheme = makeStyles((theme) => ({
  primaryButton: {
    ...theme.typography.button,
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    boxShadow: "none",
    marginTop: 50,
    padding: "15px 50px",
    "&:focus": {
      boxShadow: "none",
    },
    [theme.breakpoints.up("landscape")]: {
      fontSize: 16,
      fontWeight: 700,
    },
  },
  secondaryButton: {
    color: "#3A8DFF",
    borderRadius: 8,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
    maxWidth: "fit-content",
    padding: "10px 50px",
    [theme.breakpoints.up('landscape')]: {
      marginLeft: 30,
      height: 60
    }
  },
  primaryHeader: {
    ...theme.typography,
    fontWeight: 600,
    fontSize: 24,
    [theme.breakpoints.up('landscape')]: {
      fontSize: 32,
    }
  },
  secondaryHeader: {
    ...theme.typography,
    color: "#B1B1B1",
    fontSize: 12,
    textAlign: "center",
    height: 50,
    lineHeight: "50px",
    [theme.breakpoints.up('landscape')]: {
      fontSize: 14
    }
  },
  formControl: {
    width: "100%",
    marginTop: 15,
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
}));

export default landingTheme;