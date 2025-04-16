import React, {useState, useEffect} from 'react'
import axios from 'axios'

//this is the function that creates the page that finds some recipes
function FindRecipes(){

    //const[searchText, setSearchText] = useState("");
    const[recipes, setRecipes] = useState([]);
    const[searched, setSearchText] = useState("");

     useEffect(() =>{
         axios.get("http://localhost:3001/recipes").then((response)=>{
             setRecipes(response.data);
         });
     }, []);

    //const getRecipes = ()=>{};

    return(<>
        <div className = "form">
            <h3>Let's search for recipes</h3>
            <input className = "input" onChange = {(event) => {setSearchText(event.target.value)}}></input>
            <button className = "navLink">Search</button>
            <hr/>
        </div>

        <div>
            {recipes.map((value, key)=>{

                if(value.error)
                    return;

                return(
                <div key={value.id}className = "form">
                    <h3>{value.title}</h3>
                    <p className = "limit">{value.body}</p>
                </div>);
            })}
        </div>
    </>);
}

export default FindRecipes