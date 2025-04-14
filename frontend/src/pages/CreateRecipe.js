import React, {useState} from 'react'
import axios from 'axios'

//this is the function that will create your recipes
function CreateRecipe(){

    const [status, setStatus] = useState("");

    const createRecipe= (data) =>{ 
        axios.post("http://localhost:3001/recipe", {
            headers: {accessToken: sessionStorage.getItem("accessToken")},
        },  data
    ).then((response) => {
        if(response.body.error){
            setStatus("An error occured:" + response.body.error);
            return;
        }

        setStatus("Your recipe is successfully created!");
    })};

    return(<>
        <div>
            <h1>Create new recipe</h1>
        </div>
    </>);
}

export default CreateRecipe