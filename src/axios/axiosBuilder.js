import axios from "axios";
import { apiURL } from "../utility/constsURL";


export function setAuthorizationHeader (token_param1) {

    ///test start/////////////////////////////////////////////////////////////////////////////////////////////
    if(!token_param1){console.log(`setAuthorizationHeader did not receive valid parameter ${token_param1}`)}
    ///test end///////////////////////////////////////////////////////////////////////////////////////////////
    
        const headerValue = "Bearer " + token_param1
        console.log(`setting authorization header ${token_param1}`)
        axiosInstance.defaults.headers.common['Authorization'] = headerValue
        console.log("authorization header have been set")
    
    }


const axiosInstance = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    }
)





setAuthorizationHeader("Bearer ")
    
export default axiosInstance;


