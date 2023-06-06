import { useState } from 'react';
import {loginURL} from '../utility/constsURL'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utility/constNames';
import axios from "axios";
import { apiURL } from '../utility/constsURL';
import useRegisteredMember from './useRegisteredMember';
import { useNavigate } from 'react-router-dom';

export default function useAuthentication() {
    const {setRegisteredMember} = useRegisteredMember()
    const [authenticationError, setauthenticationError] = useState(null);
    const navigate = useNavigate()

    const axiosAuth = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
)

    //register user

    //login user
    const loginUser = async (inputs) => {
        return await axiosAuth
            .post(loginURL, inputs,{withCredentials: true})
            .then(async (response) => {
                const localAccessToken = response?.data?.access_token
                const localRefreshToken = response?.data?.refresh_token
                console.log("login done , access token " , localAccessToken)
                if(localAccessToken && localRefreshToken ){
                    localStorage.setItem(ACCESS_TOKEN,localAccessToken)
                    localStorage.setItem(REFRESH_TOKEN,localRefreshToken)
                }


            })
            .catch(err => {setauthenticationError("bad credential");})
        }

    //validate authentication
    const isAuthenticated = async () => {
        const local_access_token = localStorage.getItem(REFRESH_TOKEN);
        return local_access_token !== null && local_access_token.length > 0
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        setRegisteredMember(null)
        navigate("/login")
    }

return { loginUser, authenticationError, isAuthenticated, logout}
}