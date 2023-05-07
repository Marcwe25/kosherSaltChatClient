import { all_rooms_url } from "../utility/constsURL"
import axiosInstance from "../axios/axiosBuilder";
import { useState, useEffect } from "react";



export const UseUpdateList = (roomsNumber) => {
    const [dinList,setDinList] = useState(null);

    useEffect (()=>{
        const fetchit = async ()=>{ 
            console.log("useEffect fetchit")
            const response = await axiosInstance.get(all_rooms_url)
            setDinList(response.data)
        }
        fetchit()
    },[roomsNumber]);

    return {dinList};
}


