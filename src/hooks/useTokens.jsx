import {refresh_token_url, apiURL} from '../utility/constsURL'
import { BEARER,  ACCESS_TOKEN, REFRESH_TOKEN } from "../utility/constNames";
import jwtDecode from "jwt-decode";
import { useCallback } from 'react';
import useAuth from './auth-context';
import axios from 'axios';

export default function useTokens () {
    const {logout} = useAuth()
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
        const local_refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if(!local_refreshToken) logout()
        const headerValue = BEARER + local_refreshToken
        return await axiosRefresh
            .post(refresh_token_url,{ "token" : headerValue },)
            .then(
                (response)=> 
                        {
                            const localAccessToken = response?.data?.access_token
                            const localRefreshToken = response?.data?.refresh_token
                            if(localAccessToken && localRefreshToken ){
                                localStorage.setItem(ACCESS_TOKEN,localAccessToken)
                                localStorage.setItem(REFRESH_TOKEN,localRefreshToken)
                            }
                        }
                )
            .catch(
                (err) => {
                    logout()
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


