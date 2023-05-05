import axios from "axios";
import { apiURL } from "../utility/constsURL";
import { isAuthenticated } from "../service/tokenService";

const axiosInstance = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    }
)


export function setAuthorizationHeader (token_param1) {
///test start
if(!token_param1){console.log(`setAuthorizationHeader did not receive valid parameter ${token_param1}`)}
///test end

    const headerValue = "Bearer " + token_param1
    console.log(`setting authorization header ${token_param1}`)
    // axiosInstance.defaults.headers.common['Authorization'] =  `Bearer ${token_param1}`
    axiosInstance.defaults.headers.common['Authorization'] = headerValue
    console.log("authorization header have been set")

}




setAuthorizationHeader("Bearer ")
export function getAuthorizationHeader () {

    const header = axiosInstance.defaults.headers.Authorization
    console.log("getAuthorizationHeader got from axiosInstance.defaults.headers.Authorization")
    console.dir(header)
    if(!header) {
        console.log(`getAuthorizationHeader got no header ${header}`)
        return null
    }
    if(!header.startsWith("Bearer ")) {
        console.log(`getAuthorizationHeader got invalid authorization header ${header}`)
        return null
    }
    const token = header.substring(7);

    if(!token) {
        console.log(`getAuthorizationHeader got empty authorization header ${header}`)
        return null
    }

    return token;
}

function createAxiosInterceptor() {

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                console.log("inside axios response interceptor no error")
                console.dir(response)
                return response},
            async (error) => {
                if (error.response.status !== 403) {
                    console.log("inside axios response interceptor error!== 403")
                    return error;
                }
                console.log("inside axios response interceptor error=== 403")

                axiosInstance.interceptors.response.eject(responseInterceptor);
                console.log("axios instance response interceptor check for authentication")
                if (isAuthenticated()){
                    console.log("is authenticated, returning error.response.config")
                    console.dir(error.response.config)
                    return axiosInstance(error.response.config);
                } else {
                console.log("is not authenticated, returning error.response.config")}
                
                return error;
            }
        );

        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                console.log("using axios instance request interceptor")
                // setAuthorizationHeader()
                return config},
            (error) => Promise.reject(error)

            
        );
    }
    
createAxiosInterceptor();

export default axiosInstance;


