import IconInput from "./IconInput"
import { room_url, transition_time_a } from "../utility/constsURL"
import { useState } from "react"
import { useApi } from "../hooks/useApi"


export default function IconWithInput (props) {

    const inputError                        = props.inputError
    const placeholder                       = props.placeholder
    const handleSubmit                      = props.handleSubmit
    const cssClass                          = props.cssClass

    const [formVisible,setFormVisible]      = useState(false)

    function toggleInput () {
        setFormVisible(prevFormVisible => !prevFormVisible)
    }

    return (       
        <div 
        className= 'listMenu' >
            <IconInput 
                handleInput ={handleSubmit}
                placeholder ={placeholder}
                inputError  ={inputError}
                formVisible ={formVisible}
                />
            <div
                className= {cssClass}
                onClick={props.toggle ? props.toggle : toggleInput}
            />
        </div>
    )
}