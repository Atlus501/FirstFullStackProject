import React, {useState, useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

//this is the function that will create your recipes
function CreateRecipe(){
    const {authState} = useContext(AuthContext);

    const [status, setStatus] = useState("");

    const initialValues = {
        title: "",
        body: "",
    }

    const onSubmit = (data) =>{ 
        setStatus("");

        axios.post("http://localhost:3001/recipes", 
        {
            title: data.title,
            body: data.body,
            authorId: authState.id,
        }, {
            headers: {accessToken: localStorage.getItem("accessToken")}, 
        }).then((response) => {
            if(response.error){
                setStatus("An error occured:" + response.error);
                return;
            }
            setStatus("Your recipe is successfully created!");
    })};

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(1).required(),
        body: Yup.string().min(1).required(),
    });

    return(<>
        <div>
            <h1>Create new recipe {authState.id}</h1>
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
                <Form className = "form">

                    <label className = "heading">Enter the title:</label>
                    <Field name = "title" className = "input"></Field>
                    <ErrorMessage name = "title" className = "error" component = "span"></ErrorMessage>

                    <label className = "heading">Enter the body:</label>
                    <Field name = "body" className = "input"></Field>
                    <ErrorMessage name = "body" className = "error" component = "span"></ErrorMessage>

                    <button type = "submit" className = "navLink">Create recipe</button>
                    <span className = "error">{status}</span>
                </Form>
            </Formik>
        </div>
    </>);
}

export default CreateRecipe