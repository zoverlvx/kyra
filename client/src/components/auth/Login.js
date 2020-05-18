import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { connect } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader";

// be endpoint
const PORT = process.env.REACT_APP_PORT || "5000";
const IP = process.env.REACT_APP_AUTH_ENDPOINT 
	|| `http://localhost:${PORT}`;
const URL = `${IP}/api/auth/login`;

function FormShape({ errors, touched, status, isSubmitting }) {

  const history = useHistory();

  return (
    <div style={{ position: "relative" }}>
      <div className="auth-container">
        <h1 
			data-testid="signin-head" 
			className="auth-header"
		>
        	Sign In
        </h1>
        <p className="dontHave">
          Don"t have an account? <Link to="/">Create One</Link>
        </p>
        <Form data-testid="login-form" history={history} className="login-form">
          <div className="email">
            <label htmlFor="email">Email</label>
            <Field
              data-testid="email-field"
              placeholder="Enter Your Email. . ."
              type="text"
              name="email"
            />
            {(touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )) || (status && <p className="error">{status}</p>)}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <Field
              data-testid="password-field"
              placeholder="Password"
              type="password"
              name="password"
            />
            {(touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )) || (status && <p className="error">{status}</p>)}
          </div>
          <Button
            data-testid="submit"
            className="btn"
            color="primary"
            type="submit"
          >
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
const FormikLogin = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Valid password is required.")
  }),
  handleSubmit(
    values,
    {
      setStatus,
      setSubmitting,
      props: { history }
    }
  ) {
    const packet = {
      email: values.email,
      password: values.password
    };
    setSubmitting(true)
  
    axios
      .post(URL, packet)
      .then(res => {        
        setSubmitting(false)
        localStorage.setItem("token", res.data.token);
        history.push("/calendar");
      })
      .catch(err => {
        setSubmitting(false);
        setStatus(err);
      });
  }
})(FormShape);

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {})(FormikLogin)
