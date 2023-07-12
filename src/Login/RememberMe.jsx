import { useState,useEffect } from "react"


export default function RememberMe   (props)  {

    const remember = props.remember
    const setRemember = props.setRemember

    const init = () => {
        setRemember(localStorage.getItem("remember"))
    }

    useEffect(()=>{
        init()
    },[])
    
    const onoff = () => {
        return remember ? "cOn cIn" : "cIn"
    }

    const toggleRemember = () => {
        localStorage.setItem("remember",!remember)
        setRemember(prevRemember => !prevRemember)
    }

    return  <div className="cContainer"> 
                remember me
                <div className="cTop clickable2" onClick={toggleRemember}>
                    <div className={`${onoff()}`}/>
                </div>
            </div>
       
}