import styles from "./registerform.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {useAuth} from "../../backend/Context";
import {TextField} from "@mui/material";
import {
  AccountCircleOutlined,
  AlternateEmailOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const validationSchema = yup.object({
  displayName: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password needs to be 6 characters or more")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
  displayName: "",
};

function RegisterForm() {
  const {t} = useTranslation();
  const {signup} = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await signup(values.email, values.password, values.displayName);
      formik.resetForm();
      navigate("/catalog");
    },
  });
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  return (
    <Box
      className={styles.registerForm}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "@media screen and (max-width: 600px)": {
          marginBottom:"15rem"
        },
      }}
    >
      <h2
        style={{
          marginBottom: "55px",
        }}
      >
        {t("create_account")}
      </h2>
      <form onSubmit={formik.handleSubmit} className={styles.centerForm}>
        <TextField
          sx={{
            paddingBottom: "1rem",
            width: "17rem",
            paddingTop: ".5rem",
          }}
          id="displayName"
          name="displayName"
          label="Name"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          error={
            formik.touched.displayName && Boolean(formik.errors.displayName)
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{
            paddingBottom: "1rem",
            width: "17rem",
            paddingTop: ".5rem",
          }}
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{
            paddingBottom: "1rem",
            width: "17rem",
            paddingTop: ".5rem",
          }}
          id="password"
          name="password"
          label="Password"
          type={values.showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="standard"
          InputProps={{
            startAdornment: (
              <LockOutlined sx={{color: "rgba(0, 0, 0, 0.54)"}} />
            ),
            endAdornment: (
              <IconButton onClick={handleClickShowPassword}>
                {values.showPassword ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )}
              </IconButton>
            ),
          }}
        />
        <Button
          sx={{
            width: "266px",
            color: "white",
            marginTop: "3rem",
            marginBottom: "1rem",
          }}
          variant="contained"
          type="submit"
        >
          {t("register")}
        </Button>
      </form>
      <Link
        to="/login"
        style={{
          color: "#7E7E7E",
          textDecoration: "underline",
        }}
        className={styles.orLogin}
      >
        {t("or_login")}
      </Link>
    </Box>
  );
}

export default RegisterForm;
