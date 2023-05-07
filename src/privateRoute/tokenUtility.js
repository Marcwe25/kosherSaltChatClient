
import {setAuthorizationHeader} from '../axios/axiosBuilder';
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN} from '../utility/constNames';








export function getFromStorage (tokenNameParam){

///test start
if(!tokenNameParam && (tokenNameParam !== REFRESH_TOKEN || tokenNameParam !== ACCESS_TOKEN)){
console.log(`getFromStorage parameter invalid : ${tokenNameParam}`)
return null}
///test end
    console.log("getting from storage")
    let token = localStorage.getItem(tokenNameParam);
    console.log("got from storage")
    console.dir(token)



///test start
if(!token){
console.log(`getFromStorage did not retrieve ${tokenNameParam}`)
return null;}
///test end

    return token;
}





export function getLocalAccessToken () {
    return getFromStorage(ACCESS_TOKEN)
}





export function getLocalRefreshToken () {
    return getFromStorage(REFRESH_TOKEN)
}






export function setToStorage (tokenName, tokenValue) {

///test start
if(!tokenValue || !tokenName){
console.log(`setToStorage parameter invalid, var1: ${tokenName}, var2: ${tokenValue}`)}
///test end

    localStorage.setItem(tokenName, tokenValue);

///test start
const testToken = getFromStorage(tokenName)
if( !testToken || tokenValue !== testToken ){
console.log(`setToStorage did not set properly ${tokenName}`)}
///test end

    return tokenValue;
}








export function isTokenExpired (token_param){
    
    console.log("isTokenExpired check token for date validity")
    console.dir(token_param)
///test start
if(!token_param) {
    console.log(`isTokenExpired parameter not present ${token_param}`)
    return true;}   
///test end
    

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







export function setAccessToken (access_token_param) {
    setAuthorizationHeader(access_token_param);
    setToStorage(ACCESS_TOKEN,access_token_param);
}





export function setRefreshToken (refresh_token_param) {
    setToStorage(REFRESH_TOKEN,refresh_token_param);
}

export function setTokens (access_token,refresh_token) {
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
}