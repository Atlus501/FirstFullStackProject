import React, {useContext, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'
import axios from 'axios'

//this is the function that returns the page with the ratings
function RatingsPage(){

    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    const [recipeName, setRecipeName] = useState("");
    const [error, setError] = useState("");
    const [ratings, setRatings] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3001/recipes/search/id/'+id).then((response) => {
            if(response.data.error){
                setError("An error has occured. Please try again later");
                return;
            }

            setRecipeName(response.data.title)
        });

        axios.get('http://localhost:3001/ratings', {params: {recipeId: id, raterId: authState.id}}).then((response)=>{
            if(response.data.error){
                setError(response.data.error);
                return;}

            setRatings(response.data);
        })
    }, []);

    return (<>
        <div>

            <div>
                <h1>Here are all the ratings for {recipeName}</h1>
                <button className = "navLink" onClick = {()=>{navigate('/authed/search/'+id)}}>Back</button>
            </div>

            <span className = "error">{error}</span>

            {ratings.map(rate => {
                return (<>
                    <div className = "form">
                        <h3 className = "heading">Rater: {rate.username}</h3>
                        <h3 className = "heading">Rating: {Number(rate.value).toFixed(2)} /5.00</h3>
                        <p>{rate.comment}</p>
                    </div>
                </>);
            })}
        </div>
    </>);
}

export default RatingsPage;