import { getLocalRefreshToken } from "./refreshToken"
import axiosRefresh from "../axios/axiosRefresh";
import {refresh_token_url} from '../utility/constsURL'
import { BEARER } from "../utility/constNames";
import { setTokens } from "./tokenUtility";
import { isTokenExpired } from "./tokenUtility";
import axios from "axios";

export async function isAuthenticated () {
    console.log("running refresh xyz")

    const local_refresh_token = getLocalRefreshToken()

    if(!local_refresh_token){
        throw new Error("no refresh token")}

    const isExpire = isTokenExpired(local_refresh_token)

    if (isExpire){
        throw new Error("refresh token expire")}
    

    const headerValue = BEARER + local_refresh_token

    let refreshPost = await axios.post(refresh_token_url,{ "token" : headerValue })
    return refreshPost
}






export function isAuthenticated2 () {
    console.log("running refresh xyz")
    let isAuth = false
    const local_refresh_token = getLocalRefreshToken()

    if(!local_refresh_token || isTokenExpired(local_refresh_token)){
            return null}

    const headerValue = BEARER + local_refresh_token

    axiosRefresh
    .post(refresh_token_url,{ "token" : headerValue })
    .then((response) => {
        console.log("response xxx")
        console.dir(response)
        const data = response.data;
        const new_access_token = data.access_token
        const new_refresh_token = data.refresh_token
        setTokens(new_access_token,new_refresh_token)
        isAuth = true
    }).catch(
        isAuth=false
    )

    return isAuth;
}