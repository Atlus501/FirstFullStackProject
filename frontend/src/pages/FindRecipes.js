import React, {useState, useEffect} from 'react'
import axios from 'axios'

//this is the function that creates the page that finds some recipes
function FindRecipes(){

    //const[searchText, setSearchText] = useState("");
    const[recipes, setRecipes] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:3001/recipes").then((response)=>{
            setRecipes(response.data);
        });
    }, []);

    //const getRecipes = ()=>{};

    return(<>
        <div className = "form">
            <input className = "input" onChange = {(event) => {setSearchText(event.target.value)}}></input>
            <button className = "navLink">Search</button>
        </div>

        <div>
            {recipes.map((recipe)=>{
                <div key={recipe.id}className = "form">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.body}</p>
                </div>
            })}
        </div>
    </>);
}

export default FindRecipes