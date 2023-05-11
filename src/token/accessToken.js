
import { ACCESS_TOKEN} from '../utility/constNames';
import { isTokenExpired } from './tokenUtility';
import { setToStorage, getFromStorage } from './tokenStorage';
import { setAuthorizationHeader } from '../axios/axiosBuilder';

export function getLocalAccessToken () {
    return getFromStorage(ACCESS_TOKEN)
}


export function setAccessToken (access_token_param) {
    setAuthorizationHeader(access_token_param);
    setToStorage(ACCESS_TOKEN,access_token_param);
}

export function validateAccessToken() {
    console.log("checking if token expire")
    const local_access_token = getLocalAccessToken();
    const isExpire = isTokenExpired(local_access_token)
    console.log(`got access token ${isExpire?"is expire":"not expite"}`)
    
    if(!isExpire){
        setAccessToken(local_access_token)
        return true
    }

    return false;
}