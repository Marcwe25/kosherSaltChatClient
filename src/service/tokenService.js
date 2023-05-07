import { refresh_token_url } from "../utility/constsURL";
import axiosInstance, { setAuthorizationHeader } from '../axios/axiosBuilder';
import axios from "axios";
import { 
    getLocalAccessToken, 
    getLocalRefreshToken,
    isTokenExpired, 
    setAccessToken, 
    setTokens
     } from "../utility/tokenUtility";
import { getAuthorizationHeader } from "../axios/axiosBuilder";





export async function requestAccessToken (refresh_token) {
    await axios.post(refresh_token_url,{ refreshToken : refresh_token }).then(
        (result) => 
        {
            if (result.data?.access_token & result.data?.refresh_token)
                {
                    const got_access_token = result.data.access_token;
                    const got_refresh_token = result.data.refresh_token;

                    console.log("refresh request got:")
                    console.dir({result})

                    console.dir({got_access_token})
                    console.dir({got_access_token})
                    setTokens (got_access_token,got_refresh_token)
                    return got_access_token;
                }
        },
    )
    return null;
}






export function getValidAuthorisationHeader () {
    console.log("running getValidAuthorisationHeader")
    const header_access_token = getAuthorizationHeader()
    console.log("getValidAuthorisationHeader got from getAuthorizationHeader")
    console.dir(header_access_token)

    if(!header_access_token) {
        console.log(`getValidAuthorisationHeader got no authorisation header from axiosinstance header`)
        return null }

    if(isTokenExpired(header_access_token)) {
        console.log(`getValidAuthorisationHeader got expired authorisation header from axiosinstance header`)
        return null }

    console.log(`authorisation header is valid `)
    console.dir(header_access_token)

    return header_access_token;
}







function getValidLocalAccessToken () {
    console.log(`running getValidLocalAccessToken`)

    const local_access_token = getLocalAccessToken()
    console.log(`getValidLocalAccessToken got`)
    console.dir(local_access_token)

    if(!local_access_token) {
        console.log(`local_access_token not found`)
        console.dir(local_access_token)
        return null
    }

    if(isTokenExpired(local_access_token)) {
        console.log(`local_access_token expire`)
        console.dir(local_access_token)
        return null
    }

    return local_access_token;
}




export function getValidRefreshToken () {
    console.log("getValidRefreshToken getting")
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


function refreshAccessToken  () {
    console.log("refreshAccessToken getting with getValidRefreshToken")
    const local_refresh_token = getValidRefreshToken()
    console.log("refreshAccessToken got with getValidRefreshToken:")
    console.dir(local_refresh_token)
    if (!local_refresh_token) {
        console.log("no refresh token in local storage")
        console.dir(local_refresh_token)
        return null;}

    console.log("refresh token found in local storage")
    console.dir(local_refresh_token)
    return requestAccessToken(local_refresh_token)
};



 function searchValidAccessToken () {

    console.log("searching for access token")

    console.log("searching for access token in header")
    const header_access_token = getValidAuthorisationHeader()

    if(header_access_token) { 
        console.log(`getValidAuthorisationHeader found:`)
        console.dir({header_access_token})
        return header_access_token;}

    console.log("searching for access token in header no found")
    console.dir(header_access_token)

    console.log("searching for access token in local storage")
    let found_local_access_token =  getValidLocalAccessToken()
    if(found_local_access_token) { 
        console.log(`getValidLocalAccessToken found:`)
        console.dir(found_local_access_token)
        return found_local_access_token}

    console.log("searching for access token in local storage not found")
    console.dir(found_local_access_token)

    console.log("trying refresh token")
    const refreshed_access_token = refreshAccessToken()
    if (refreshed_access_token) {
        console.log(`searchValidAccessToken got refreshed:`)
        console.dir({refreshed_access_token})
        return refreshed_access_token}

    console.log("refreshAccessToken unsuccesfull")
    console.dir(refreshed_access_token)

    console.dir({"noAccessToken":"noAccessToken"})
    return null;
}





 function checkAccessToken () {
    console.log("token utility checkAccessToken checking for access token")
    const token = null
    try {
    const token = searchValidAccessToken()
    console.log("token utility checkAccessToken got")
    console.dir(token)
    if(token) {
        setAccessToken(token)
        return true}
    } catch (e) {
        console.error("token utility checkAccessToken got error while searchValidAccessToken")
        console.error(e)
    }


    if(token) {
        setAccessToken(token)
        return true}
    return false
}






export function isAuthenticated () {
    console.log("token utility is checking isAuthenticated")

    const result = checkAccessToken ()
    console.log("token utility isAuthenticated found")
    console.dir(result)
    return  result
}

