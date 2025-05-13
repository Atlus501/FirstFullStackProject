import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {AuthContext} from '../helpers/AuthContext';
import {useParams} from 'react-router-dom';

//this is the function that will create your recipes
function EditRecipePage(){
    const {authState} = useContext(AuthContext);
    let {id} = useParams();

    const [status, setStatus] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/recipes/search/id/'+id).then((response)=>{

            if(response.data.error)
            {
                setStatus(response.data.error);
                return;
            }

            setStatus("");
            setBody(response.data.body);
            setTitle(response.data.title);
        });
    }, []);

    const onSubmit = () =>{ 
        setStatus("");

        axios.put("http://localhost:3001/recipes/"+id, 
        {
            title: title,
            body: body,
            authorId: authState.id,
        }, 
        {
            headers: {accessToken: localStorage.getItem("accessToken")}, 
        }).then((response) => {
            if(response.data.error){
                setStatus("An error occured:" + response.data.error);
                return;
            }
            setStatus(response.data.success);
    })};

    return(<>
        <div>
            <h1>Update an existing recipe {authState.id}</h1>
            <div className = "form">

                <label className = "heading">Enter the title:</label>
                <input className = "input" type="title" value = {title} onChange={(event)=>{setTitle(event.target.value)}}></input>

                <label className = "heading">Enter the body:</label>
                <textarea className = "input" value = {body} id = "body" type="body" onChange={(event)=>{setBody(event.target.value)}}></textarea>

                <button onClick = {onSubmit} className = "navLink">Create recipe</button>
                <span className = "error">{status}</span>
            </div>
        </div>
    </>);
}

export default EditRecipePage