import IconInput from "./IconInput"
import { addUserToRoom_url, room_url, transition_time_a } from "../utility/constsURL"
import { useState } from "react"
import { useApi } from "../hooks/useApi"
import IconWithInput from "./IconWithInput"


export default function AddUserToChat (props) {

    const   roomId                          = props.roomId
    const   addUseError                     = "error adding user"
    const   [inputError, setInputError]     = useState(null)
    const   [placeholder, setPlaceholder]   = useState("add user")
    const   {axiosInstance}                 = useApi()
    const   cssClass                        ='addUserIcon menuButton' 
    

    const handleInput = async (input) => {
        input = input.inputValue
        console.log("input",input)

          if (!input || input.trim().length == 0) return false
          
          try {
            const user = input.trim();
            await axiosInstance.put(addUserToRoom_url+"/"+roomId,
            {"username" : user})
            props.refreshRoomList()

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