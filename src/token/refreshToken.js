import { REFRESH_TOKEN} from '../utility/constNames';
import {refresh_token_url} from '../utility/constsURL'
import { isTokenExpired } from './tokenUtility';

import { setToStorage, getFromStorage } from './tokenStorage';
import { setTokens } from './tokenUtility';
import axiosRefresh from '../axios/axiosRefresh'


export function setRefreshToken (refresh_token_param) {
    setToStorage(REFRESH_TOKEN,refresh_token_param);
}



export function getLocalRefreshToken () {
    return getFromStorage(REFRESH_TOKEN)
}



export function getValidRefreshToken () {

    const local_refresh_token = getLocalRefreshToken()

    console.log("getValidRefreshToken got")
    console.dir(local_refresh_token)
    
    if(!local_refresh_token) {
        console.log("getValidRefreshToken got empty token")
        console.dir(local_refresh_token)
        return null}

    if(isTokenExpired(local_refresh_token)) {
        console.log("getValidRefreshToken got expired token")
        console.dir(local_refresh_token)
        return null}

    console.log("getValidRefreshToken got valid token")
    console.dir(local_refresh_token)
    return local_refresh_token
}


export async function postRefresh (token_param2) {
    let data;
    try {
        data = await axiosRefresh.post(refresh_token_url,{ "token" : token_param2 });
        }
    catch {
        return null;
    }
    
    return data
}


export async function refreshAccessToken  () {

    console.log("refreshAccessToken getting with getValidRefreshToken")
    const local_refresh_token = getValidRefreshToken()

    if (!local_refresh_token) {
        console.log("no refresh token in local storage")
        console.dir(local_refresh_token)
        return false;}


    const param4 = "Bearer " + local_refresh_token;

    const response = await postRefresh(param4)      
    
    
    console.log("refreshAccessToken got")
    console.dir(response)

    const new_access_token = response.access_token
    const new_refresh_token = response.refresh_token

    const isExpire = isTokenExpired(new_access_token);

    if(isExpire){
        console.log("token refreshed already expired")
        console.dir(new_access_token)
        return false;
    } else {
        console.log("succesffuly refreshed")
        console.dir(new_access_token)
        console.dir(new_refresh_token)
        setTokens(new_access_token,new_refresh_token);
        return true;

    }

};


