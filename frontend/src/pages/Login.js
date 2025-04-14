import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

//this is the function that would create the login page
function Login() {
    const initialValues = {
        username: "",
        password: "",
    };

    const [error, setError] = useState("");

    const onSubmit = (data) => {
        setError("");

        axios.post("http://localhost:3001/users", data).then((response) => {
            if (response.data.error) {
                setError("An error has occured: " + response.error);
                localStorage.setItem("accessToken", response.data);
            } else {
                setError("User authenticated!");

            }
        }).catch((err) => {
            setError("An error occurred: " + err.message);
        });
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(1).max(30).required(),
        password: Yup.string().min(1).max(30).required(),
    });

    return (
        <div>
            <h1>Welcome! Please Proceed to Login</h1>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="form">
                    <label className = "heading">Enter Your Username:</label>
                    <Field name="username" className="input" />
                    <ErrorMessage className = "error" name="username" component="span" />

                    <label className = "heading">Enter Your Password:</label>
                    <Field name="password" className="input" />
                    <ErrorMessage className = "error" name="password" component="span" />

                    <button className = "navLink" type="submit">Login</button>
                    <span className = "error">{error}</span>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;