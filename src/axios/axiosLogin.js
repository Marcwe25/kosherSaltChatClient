import axios from "axios";
import { apiURL } from "../utility/constsURL";


const axiosLogin = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    })

export default axiosLogin