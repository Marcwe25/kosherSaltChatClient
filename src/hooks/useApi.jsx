import useTokens from "./useTokens"
import axios from "axios";
import { apiURL } from '../utility/constsURL';
import { ACCESS_TOKEN, REFRESH_TOKEN} from '../utility/constNames';


export function useApi () {

    const {postRefreshToken, isTokenExpired} = useTokens()


    // const n = Math.random()
    // console.log(n)

    const axiosInstance = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    function setAuthorizationHeader (token_param1) {
        const headerValue = "Bearer " + token_param1
        // console.log(`setting authorization header ${token_param1}`)
        axiosInstance.defaults.headers.common['Authorization'] = headerValue
        // console.log("authorization header have been set")
    
    }


    createAxiosRequestInterceptor()
    createAxiosResponseInterceptor()
    // setAuthorizationHeader("Bearer ")

    function createAxiosResponseInterceptor() {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                // console.log('interceptor response', response)
                return response
            },
            async (error) => {   
                const prevRequest = error?.config
                // console.log('response intercept', prevRequest)
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    console.log("sentttt",prevRequest.sent)
                    prevRequest.sent = true
                    await postRefreshToken()
                    const newAccessToken = localStorage.getItem(ACCESS_TOKEN)
                    // console.log('new access token', newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                    return axiosInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );
    }
    
    function createAxiosRequestInterceptor() {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                // console.log('inerceptor request', config )
                const accessToken = localStorage.getItem('access_token')
                // console.log('inerceptor access token', accessToken)
                return {
                  ...config,
                  headers: {
                    ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
                    ...config.headers,
                  },
                };
              }, (error) => Promise.reject(error)
        );

    }

    function setAuthorizationHeader (token_param1) {
        const headerValue = "Bearer " + token_param1
        // console.log(`setting authorization header ${token_param1}`)
        axiosInstance.defaults.headers.common['Authorization'] = headerValue
        // console.log("authorization header have been set")
    
    }

    return {axiosInstance, setAuthorizationHeader}

} 