import { makeStyles } from "@material-ui/core/styles";

const landingTheme = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
    [theme.breakpoints.up("landscape")]: {
      flexDirection: "row",
      padding: "10px 40px 0 40px",
      justifyContent: "flex-end",
      marginBottom: 0,
    },
  },
  secondaryLink: {
    ...theme.typography,
    color: "#3A8DFF",
    fontSize: 12,
  },
  buttonContainer: {
    justifyContent: "space-around",
  },
  primaryButton: {
    ...theme.typography.button,
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    boxShadow: "none",
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.5, 5),
    "&:focus": {
      boxShadow: "none",
    },
    [theme.breakpoints.up("landscape")]: {
      padding: theme.spacing(1, 4),
      marginBottom: theme.spacing(2),
    },
  },
  secondaryButton: {
    color: "#3A8DFF",
    borderRadius: 8,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
    maxWidth: "fit-content",
    padding: theme.spacing(0.5, 4),
    [theme.breakpoints.up("landscape")]: {
      marginLeft: theme.spacing(4),
      padding: theme.spacing(1, 2),
    },
  },
  primaryHeader: {
    ...theme.typography,
    ...theme.typography.header,
  },
  secondaryHeader: {
    ...theme.typography,
    color: "#B1B1B1",
    textAlign: "center",
    height: 50,
    lineHeight: "50px",
    [theme.breakpoints.up("landscape")]: {
      fontSize: 14,
    },
  },
  form: {
    margin: "auto 0",
    [theme.breakpoints.up("landscape")]: {
      width: "70%",
      maxHeight: "100%",
    },
  },
  formControl: {
    width: "90vw",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("landscape")]: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  },
  textField: {
    ...theme.typography,
    width: "100%",
    height: 28,
  },
  protectedField: {
    ...theme.typography,
    width: "100%",
    fontSize: 24,
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid #E0E0E0",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderBottom: "2px solid #86B9FF",
    },
    "&:after": {
      borderBottom: "2px solid #3A8DFF",
    },
  },
}));

export default landingTheme;