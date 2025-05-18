import React, {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext'
import {AuthUser} from '../helpers/AuthUser'

//this is the method that would create the page that allows you to display your recipes
function YourRecipe(){
    const [recipes, setRecipes] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const {authState} = useContext(AuthContext);

    const getDefault = () => {
        axios.get('http://localhost:3001/recipes/search/your', {params: {userId: authState.id}}).then((response) =>{
        if(response.data.error){
            return;
        }
        setRecipes(response.data);
    })};

    AuthUser();

    useEffect(() => {
        getDefault();
    }, []);   
    
    const search = () =>{
        axios.get('http://localhost:3001/recipes/search/your/specific', {params: {authorId: authState.id, title: title}}).then((response)=>{
            if(response.data.error)
                return;

            setRecipes(response.data);
        })
    };

    const clear = ()=>{
        setTitle("");
        getDefault();
    }

    return(<>
        <div>
            <h1>Here are your recipes</h1>

            <div className = "form">
                <h3>Would you like to search for one?</h3>
                <input className = "input" onChange = {(event)=>{setTitle(event.target.value)}}></input>
                <div>
                    <button className = "navLink" onClick = {search}>Search</button>
                    <button className = "navLink" onClick = {clear}>Clear</button>
                </div>
            </div>

            {(recipes.length === 0) ? (<span className = "error">There are no recipes</span>) :(

                recipes.map((value, key)=>{
                    
                    return(<div className = "form" key = {key}>
                        <h3 className = "heading">{value.title}</h3>
                        <h3 className = "heading">Rating: {value.averageRating}</h3>
                        <p>{value.body}</p>

                        <div>
                        <button className = "navLink" onClick = {() => {navigate('/authed/search/'+value.id)}}>Open</button>
                        <button className = "navLink" onClick = {() => {
                            axios.delete('http://localhost:3001/recipes/delete', {params: {id: value.id}}).then(()=>{
                            setRecipes(recipes.filter((val)=>{return val.id !== value.id}))});
                        }}>Delete</button>

                        <button className = "navLink" onClick = {()=>{
                            navigate('/authed/edit/'+value.id)
                        }}>Edit</button>

                        </div>
                    </div>)
                })
            )}
        </div>
    </>);
}

export default YourRecipe