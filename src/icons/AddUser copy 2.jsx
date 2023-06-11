import IconInput from "./IconInput"
import { room_url, transition_time_a } from "../utility/constsURL"
import { useState } from "react"
import { useApi } from "../hooks/useApi"
import IconWithInput from "./IconWithInput"


export default function AddUser () {

    const   addUseError                     = "error adding user"
    const   [inputError, setInputError]     = useState(null)
    const   [placeholder, setPlaceholder]   = useState("add user")
    const   {axiosInstance}                 = useApi()
    const   cssClass                        ='addUserIcon menuButton' 
    

    const handleInput = async (input) => {
          console.log("inputt345",input)
          if (!input || input?.inputValue.trim().length == 0) return false
          
          try {

            const users = input.inputValue.split(',');
            await axiosInstance.post(room_url,users)
            return true

          } catch (e) {
            setPlaceholder(addUseError)
            setTimeout(() => setPlaceholder(input), transition_time_a);
            return false
          }

      }



    return (       
        <div 
        className= 'listMenu' >
            <IconWithInput 
                inputError={inputError}
                placeholder={placeholder}
                handleSubmit={handleInput}
                cssClass={cssClass}
            />
        </div>
    )
}