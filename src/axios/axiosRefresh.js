import axios from "axios";
import { apiURL } from "../utility/constsURL";


const axiosRefresh = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                }    }
)

export default axiosRefresh