import {refreshAccessToken} from './refreshToken'
import { validateAccessToken } from './accessToken';



 export async function  checkAccessToken ()  {
    console.log("token utility checkAccessToken checking for access token")

    try {validateAccessToken() || await refreshAccessToken() }

    catch {return false;}
}



export async function isAuthenticated () {
    console.log("token utility is checking isAuthenticated")

    const result = checkAccessToken ()
    console.log("token utility isAuthenticated found")
    console.dir(result)
    return  result
}

