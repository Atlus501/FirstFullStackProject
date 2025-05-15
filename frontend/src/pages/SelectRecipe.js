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
        <h1 className = "heading">{recipe.title}</h1>
        <p>Recipe Rating: {recipe && recipe.numRating > 0 ? recipe.totalRating / recipe.numRating : 0} / 5</p>

        <div>
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
            <button>Rate</button>
        </div>
        
        <p>{recipe.body}</p>
        <span className = "error">{error}</span>
    </div>
    </>);
};

export default SelectRecipe