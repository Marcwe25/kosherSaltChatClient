import {refresh_token_url} from '../utility/constsURL'
import { BEARER } from "../utility/constNames";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN} from '../utility/constNames';
import { apiURL } from '../utility/constsURL';
import { useApi } from './useApi';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';


export default function useTokens () {

    const navigate = useNavigate()
    const axiosRefresh = axios.create(
            {
                baseURL: apiURL,
                headers: {
                    "Content-Type": "application/json",
                        },
                        withCredentials: true
            }
        )
    

    const  postRefreshToken = useCallback ((async function () {
        console.log("bbb")
        const local_refreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        const headerValue = BEARER + local_refreshToken
        return await axiosRefresh
            .post(refresh_token_url,{ "token" : headerValue },)
            .then(
                (response)=> 
                        {
                            const localAccessToken = response?.data?.access_token
                            const localRefreshToken = response?.data?.refresh_token
                            console.log("login done , access token " , localAccessToken)
                            if(localAccessToken && localRefreshToken ){
                                localStorage.setItem(ACCESS_TOKEN,localAccessToken)
                                localStorage.setItem(REFRESH_TOKEN,localRefreshToken)
                            }
                        }
                )
            .catch(
                (err) => {
                    navigate("/login")
                }
            )
        }),[])


    function isTokenExpired (token_param){
    
        const decodedToken = jwtDecode(token_param);
            const currentTime = Date.now() / 1000;
            const exp = decodedToken.exp < currentTime;
            return exp
    
   
    }

    return { postRefreshToken, isTokenExpired}
}


