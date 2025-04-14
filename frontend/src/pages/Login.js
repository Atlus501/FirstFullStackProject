import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

function Login() {
    const initialValues = {
        username: "",
        password: "",
    };

    const [error, setError] = useState("");

    const onSubmit = (data) => {
        setError("");

        axios.post("http://localhost:3001/users", data).then((response) => {
            if (response.error) {
                setError("An error has occured: " + response.error);
            } else {
                setError("User successfully created!");
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
                    <label>Enter Your Username:</label>
                    <Field name="username" placeholder="What Username Would You Like?" className="input" />
                    <ErrorMessage name="username" component="span" />

                    <label>Enter Your Password:</label>
                    <Field name="password" placeholder="What Password Would You Like?" className="input" />
                    <ErrorMessage name="password" component="span" />

                    <button type="submit">Login</button>
                    <span>{error}</span>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;