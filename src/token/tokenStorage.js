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
    

