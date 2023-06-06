import IconInput from "./IconInput"
import { room_url, transition_time_a } from "../utility/constsURL"
import { useState } from "react"
import { useApi } from "../hooks/useApi"


export default function AddUser () {

    const addUseError = "error adding user"
    const  [inputError, setInputError] = useState(null)
    const  [placeholder, setPlaceholder] = useState("add user")
    const [formVisible,setFormVisible] = useState(false)
    const {axiosInstance} = useApi()

    
    function totggleNewRoom () {
        setFormVisible(prevFormVisible => !prevFormVisible)
    }

    const handleInput = async (input) => {

          if (!input || input.trim().length == 0) return false
          
          try {

            const users = input.split(',');
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
            <IconInput 
                handleInput={handleInput}
                placeholder={placeholder}
                inputError={inputError}
                formVisible={formVisible}
                />
            <div 
                className='addUserButton menuButton' 
                onClick={totggleNewRoom}
                />
        </div>
    )
}