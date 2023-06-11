import { useState } from 'react';
import {loginURL} from '../utility/constsURL'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utility/constNames';
import axios from "axios";
import { apiURL } from '../utility/constsURL';
import { useNavigate } from 'react-router-dom';
import useAuth from './auth-context';
import { useApi } from "./useApi";
import {  member_url } from "../utility/constsURL";

export default function useAuthentication() {

    const {registeredMember,login,logout} = useAuth()
    const [authenticationError, setauthenticationError] = useState(null);
    const navigate = useNavigate()
    const {axiosInstance} = useApi()

    const randomid = Math.random()
    console.log("useAuthentication randomid",randomid)

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
                    setUserDetail()
                }



            })
            .catch(err => {setauthenticationError("bad credential");})
        }

    const setUserDetail = async () => {
        await axiosInstance.get(member_url)
                .then(res => {
                    login(res?.data);
            })
    }

    //validate authentication
    const isAuthenticated = async () => {
       return registeredMember !== null
    }

    const logoutUser = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        logout()
        navigate("/login")
    }

return { loginUser, authenticationError, isAuthenticated, logoutUser, setUserDetail}
}