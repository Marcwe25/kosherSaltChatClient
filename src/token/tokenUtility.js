import { useState } from "react";
import jwtDecode from "jwt-decode";
import { setAccessToken } from "./accessToken";
import { setRefreshToken } from "./refreshToken";

export function isTokenExpired (token_param){
    
    console.log("isTokenExpired check token for date validity")
    console.dir(token_param)


    ///test start//////////////////////////////////////////////////////////////
    if(!token_param) {console.log(`isTokenExpired parameter not present ${token_param}`)
        return true;}   
    ///test end/////////////////////////////////////////////////////////////////
    

    try{
        const decodedToken = jwtDecode(token_param);
        const currentTime = Date.now() / 1000;
        const exp = decodedToken.exp < currentTime;
        console.log(`isTokenExpired got token is : ${exp?"expire":"not expire"}`)
        return exp

    } catch {
        console.log(`isTokenExpired did not decode correctly`)
        console.dir(token_param)
    } 
    return true;
}


export function setTokens (access_token,refresh_token) {
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
}


