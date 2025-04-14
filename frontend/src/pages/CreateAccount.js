import React, {useState} from 'react';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

//this is the function that creates the account creation page
function CreateAccount(){
    const [error, setCreateError] = useState("");

    const initialValues = {
        username: "",
        password: "",
    };

    const onSubmit = (data) => {
        setCreateError("");

        axios.post("http://localhost:3001/users/register", data).then((response) => {
            if(response.error){
                setCreateError("An errror has occured "+response.error);
                return;
            }

            setCreateError("User successfully created!");
        }).catch((err) => {
            setCreateError("An error has occured "+err.message)
        });
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(1).max(30).required(),
        password: Yup.string().min(1).max(30).required(),
    });

    return(<>
        <div>
            <h1>Create your account!</h1>

            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
                <Form className = "form">
                    <label className = "heading">Enter your desired username:</label>
                    <Field className = "input" name = "username" placeholder="What Username Would You Like?" />
                    <ErrorMessage className = "error" name = "username" component = "span"/>

                    <label className = "heading">Enter your desired password:</label>
                    <Field className = "input" name = "password" placeholder="What Password Would You Like?"/>
                    <ErrorMessage className = "error" name = "password" component = "span"/>

                    <button className = "navLink" type = "submit">Create Account</button>
                    <span className = "error">{error}</span>
                </Form>
            </Formik>
        </div>
    </>);

}

export default CreateAccount