import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";

// be endpoint
const PORT = process.env.REACT_APP_PORT || "5000";
const IP = process.env.REACT_APP_AUTH_ENDPOINT 
	|| `http://localhost:${PORT}`;
const URL = `${IP}/api/auth/register`;

function FormShape({ errors, touched, isSubmitting }) {

  const history = useHistory();

  return (
    <div style={{ position: "relative" }}>
      <div className="auth-container">
        <h1 
			data-testid="signup-head" 
			className="auth-header"
		>
			Sign Up
		</h1>
        <p className="dontHave">
          Already have an account? <Link data-testid="signin cta" to="/login">Sign In</Link>
        </p>
        <Form 
			data-testid="signup" 
			history={history} 
			className="register-form"
		>
        <div className="names">
        <div className="first-name">
          <label htmlFor="firstName">First Name</label>
          <Field 
				className="register-input" 
				placeholder="First Name" 
				name="firstName" 
				type="text" 
		  />
          	{touched.firstName && errors.firstName && (
            <p data-testid="reg-a" className="error">{errors.firstName}</p>
          )}
          </div>
          <div className="last-name">
          <label htmlFor="lastName">Last Name</label>
          <Field 
				className="register-input" 
				placeholder="Last Name" 
				name="lastName" 
				type="text" 
		  />
          {touched.lastName && errors.lastName && (
            <p data-testid = "reg-b" className="error">{errors.lastName}</p>
          )}
          </div>
          </div>
            <div className = "email">
            
          <label htmlFor="email">Email</label>
          <Field className = "register-input" placeholder="Email" type="email" name="email" />
          {touched.email && errors.email && (
            <p data-testid="reg-c" className="error">{errors.email}</p>
          )}
          </div>
          <div className ="passwords">
          <div className ="password">
          <label htmlFor="password">Password</label>
          <Field className = "register-input" placeholder="Password" type="password" name="password" />
          {touched.password && errors.password && (
            <p data-testid = "reg-d" className="error">{errors.password}</p>
          )}
          </div>
          <div className = "confirm-password">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field className = "register-input" placeholder = "Confirm Password" type="password" name="confirmPassword" />
          {touched.confirmPassword && (
            <p data-testid = "reg-e" className="error">{errors.confirmPassword}</p>
          )}
          </div>
          </div>
          <Button color="primary" type="submit" data-testid="getstarted">
          {isSubmitting ?
            <ClipLoader
                  sizeUnit={"px"}
                  size={30}
                  color={"#E5E5E5"}
               />
          : "LOG IN"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withFormik({
  mapPropsToValues({ firstName, lastName, email, password, confirmPassword }) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || ""
    };
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password cannot be more than 16 characters.")
      .required("Password must be 8 to 16 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("You must confirm your password")
  }),
  handleSubmit(
    values,
    {
      setSubmitting,
      props: { history }
    }
  ) {
    const packet = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    };
    setSubmitting(true)
    axios
      .post(URL, packet)
      .then(res => {
        setSubmitting(false)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        history.push("/calendar");
      })
      .catch(err => {
        setSubmitting(false)
      });
  }
})(FormShape);
