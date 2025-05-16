import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

//this is the function that creates the page that finds some recipes
function FindRecipes(){

    //const[searchText, setSearchText] = useState("");
    const[recipes, setRecipes] = useState([]);
    const[searched, setSearchText] = useState("");
    const[error, setError] = useState("");

    const navigate = useNavigate();

     useEffect(() =>{
         axios.get("http://localhost:3001/recipes").then((response)=>{
             setRecipes(response.data);
         });
     }, []);

    const getRecipes = ()=>{
        axios.get("http://localhost:3001/recipes/search", {params: {title: searched}}).then((response)=>{
            setRecipes(response.data);
        });
    };

    return(<>
        <div className = "form">
            <h3>Let's search for recipes</h3>
            <input className = "input" onChange = {(event) => {setSearchText(event.target.value)}}></input>
            <button className = "navLink" onClick = {getRecipes}>Search</button>
            <span className = "error">{error}</span>
        </div>

        <div>
            {
            (recipes.length === 0) ? (<span>There aren't any recipes</span>) : (
                recipes.map((value, key)=>{

                return(
                <div key={key} className = "form">
                    <h3 className = "heading">{value.title}</h3>
                    <h3 className = "heading">Author: {value.username}</h3>
                    <p className = "limit">{value.body}</p>
                    <button className = "navLink" onClick = {() => {navigate('/authed/search/'+value.id)}}>Open</button>
                </div>);
            }))}
        </div>
    </>);
}

export default FindRecipes