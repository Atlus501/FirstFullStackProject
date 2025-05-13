import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from './AuthContext'
import {useContext, useEffect} from 'react'

//this is a method that would verify the user first. If they aren't, then they'll be set to the main apge
export function AuthUser(){
    const navigate = useNavigate();
    const {authState, setAuthState} = useContext(AuthContext);

    useEffect(()=>{

    const reset = () => {
        setAuthState({...authState, status: false});
        localStorage.removeItem("accessToken");
        setTimeout(() => {
            navigate("/");
        }, 0);
    };

    try{
        axios.get("http://localhost:3001/users/auth", {headers: {

            accessToken: localStorage.getItem("accessToken")}}).then((response) => {
        
            if(response.data.error){
                reset();
            }
        
         });
    }catch(error){
        console.log("An error has occured!" + error);
        reset();
    }}, []);
};