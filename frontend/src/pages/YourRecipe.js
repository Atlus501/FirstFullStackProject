import React, {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext'

//this is the method that would create the page that allows you to display your recipes
function YourRecipe(){
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3001/recipes/search/your', {params: {userId: authState.id}}).then((response) =>{
            if(response.data.error){
                return;
            }
            setRecipes(response.data);
        });
    }, []);

    return(<>
        <div>
            <h1>Here are your recipes</h1>
            {
                recipes.map((value, key)=>{
                    
                    return(<div className = "form" key = {key}>
                        <h3 className = "heading">{value.title}</h3>
                        <p>{value.body}</p>
                        <button className = "navLink" onClick = {() => {navigate('/authed/search/'+value.id)}}>Open</button>
                    </div>);
                })
            }
        </div>
    </>);
}

export default YourRecipe