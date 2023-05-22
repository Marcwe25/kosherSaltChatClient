import Loading from "./Loading";
import {Navigate} from "react-router-dom";
import { useState } from "react";


export default function Waiting () {
    const timeoutLenght = 3000

    const [isLoading, setLoading] = useState(true);

    const letMeTry = () => {
        setTimeout(
            ()=>{
                if(isLoading){
                    setLoading(false)}
                },
            timeoutLenght
        )
    }

    letMeTry ()

    return  <Loading />

    // return isLoading ? <Loading /> : <Navigate to={'/login'} /> 

}