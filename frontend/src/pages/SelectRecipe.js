import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'
import {Form, Formik, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup'

//this is the function that would create the page once he selects the recipe
function SelectRecipe(){

    let {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");
    const [result, setResult] = useState("");
    const [yourRating, setYourRating] = useState({value: 0, comment: ""});

    const navigate = useNavigate();

    const {authState} = useContext(AuthContext);

    const initialValues = {
        value: 0,
        comment: "",
    }

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/ratings', {
            recipeId: id,
            raterId: authState.id,
            value: data.value,
            comment: data.comment,
        }).then((response) => {
            if(response.data.error){
                setResult("An error occured! " + response.error);
                return;
            }

            setResult("You've Successfully Rated the Recipe!")
        }
        ).catch(error => setResult("A problem occured! "+error));

    };

    const validationSchema = Yup.object().shape({
        value: Yup.number(),
        comment: Yup.string().max(200).trim(),
    });

    useEffect(() => {
        axios.get('http://localhost:3001/recipes/search/id/'+id).then((response)=>{

            if(response.data.error)
            {
                setError(response.data.error);
                return;
            }

            setError("");
            setRecipe(response.data);
        });

        axios.get('http://localhost:3001/ratings/your', {params: {recipeId: id, raterId: authState.id}}).then((response)=>{
            setYourRating(response.data);
        });
    }, []);

    return(<>
    <div className = "form">
        <h1>{recipe?.title || "Loading..."}</h1>
        <h3 className = "heading">Author: {recipe?.username || "Loading..."}</h3>
        <h3 className = "heading">Rating: {recipe?.averageRating || "Loading..."}</h3>
        
        <p>{recipe?.body || "Loading..."}</p>
        <span className = "error">{error}</span>
    </div>

    <div>
        <Formik initialValues = {initialValues} enableReinitialize={true} onSubmit = {onSubmit} validationSchema = {validationSchema}>
            <Form className = "form">
                <label className = "heading">Rate the Recipe From 0 to 5</label>
                <Field as="select" name = "value" value = {yourRating.value}>
                    <option value = "0">0</option>
                    <option value = "1">1</option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                </Field>
                <ErrorMessage className = "error" name = "value" component = "span"></ErrorMessage>

                <label className = "heading">Would you like to leave a comment as well? (Optional)</label>
                <Field className = "input" name = "comment" placeholder="comment" value = {yourRating.comment}></Field>
                
                <button className = "navLink" type = "submit">Rate</button>
                <span className = "error">{result}</span>
            </Form>
        </Formik>    
    </div>

    <div className = "form">
        <button className = "navLink">View Ratings/Comments</button>
    </div>
    </>);
};

export default SelectRecipe
