import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

//this is the function that would create the page once he selects the recipe
function SelectRecipe(){

    let {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState("");

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
    }, []);

    return(<>
    <div className = "form">
        <h1 className = "heading">{recipe.title}</h1>
        <p>{recipe.body}</p>
        <span className = "error">{error}</span>
    </div>
    </>);
};

export default SelectRecipe