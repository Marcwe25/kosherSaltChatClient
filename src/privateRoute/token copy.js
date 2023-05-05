import jwtDecode from 'jwt-decode';
import { refresh_token_url } from "../utility/constsURL";
import axios from "axios";
import axiosInstance from '../axios/axiosBuilder';

export function setTokens (access_token,refresh_token) {
    axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${access_token}`}
    localStorage.setItem("access_token",access_token);
    localStorage.setItem("refresh_token",refresh_token);
}

export function tokenValid (token) {
    if(!token) {return false;}
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
}

export function haveAccessToken () {
    const local_access_token = localStorage.getItem("access_token")
    return tokenValid(local_access_token);
}

export async function refreshAccessToken  () {
    const local_refresh_token = localStorage.getItem("refresh_token")
    if (!local_refresh_token) {return false;}

    try {
        axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${local_refresh_token}`}
        const response = await axiosInstance.post(refresh_token_url);
        if (response.data.access_token) {
            const got_access_token = response.data.access_token;
            const got_refresh_token = response.data.refresh_token;
            setTokens (got_access_token,got_refresh_token)
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export async function isAuthenticated () {
    return haveAccessToken() || refreshAccessToken()
}