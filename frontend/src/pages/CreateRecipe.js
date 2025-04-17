import React, {useState, useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext';

//this is the function that will create your recipes
function CreateRecipe(){
    const {authState} = useContext(AuthContext);

    const [status, setStatus] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    const onSubmit = () =>{ 
        setStatus("");

        axios.post("http://localhost:3001/recipes", 
        {
            title: title,
            body: body,
            authorId: authState.id,
        }, {
            headers: {accessToken: localStorage.getItem("accessToken")}, 
        }).then((response) => {
            if(response.data.error){
                setStatus("An error occured:" + response.data.error);
                return;
            }
            setStatus("Your recipe is successfully created!");
    })};

    return(<>
        <div>
            <h1>Create new recipe {authState.id}</h1>
            <div className = "form">

                <label className = "heading">Enter the title:</label>
                <input className = "input" type="title" onChange={(event)=>{setTitle(event.target.value)}}></input>

                <label className = "heading">Enter the body:</label>
                <textarea className = "input" id = "body" type="body" onChange={(event)=>{setBody(event.target.value)}}></textarea>

                <button onClick = {onSubmit} className = "navLink">Create recipe</button>
                <span className = "error">{status}</span>
            </div>
        </div>
    </>);
}

export default CreateRecipe