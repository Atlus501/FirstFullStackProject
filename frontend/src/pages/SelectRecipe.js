import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

//this is the function that would create the page once he selects the recipe
function SelectRecipe(){

    let {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState("");
    const [rating, setRating] = useState(0);

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
        <h1>{recipe.title}</h1>
        <h3 className = "heading">Author:</h3>
        
        <p>{recipe.body}</p>
        <span className = "error">{error}</span>
    </div>

    <div className = "form">
        <h2 className = "heading">Would you like to give this recipe a rating?</h2>
            <select
                id = "ratings"
                value = {rating}
                onChange = {(event) => {
                    setRating(parseInt(event.target.value))
                }}>

                <option value = "0">0</option>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>

            </select>
            <button className = "navLink">Rate</button>
        </div>
    </>);
};

export default SelectRecipe