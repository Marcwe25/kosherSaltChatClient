import AddUser from '../icons/AddUser';
import GoToProfile from '../icons/GoToProfile';
import InputForm from '../icons/InputForm';
import Logout from '../icons/Logout';
import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { room_url, transition_time_a } from "../utility/constsURL"

export default function RoomListMenu (props) {

    const handleRoomClick = props.handleRoomClick
    const   {axiosInstance} = useApi()

    const [targetid, setTatgetid] = useState("menu")


    
    const   addUseError                     = "error adding user"
    const   [inputError, setInputError]     = useState(null)
    const   [placeholder, setPlaceholder]   = useState("add user")
    const   cssClass                        ='addUserIcon menuButton' 

    

    const handleInput = async (input) => {
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

    const toggleInput = (target) => {
        console.log("received ",target)
        setTatgetid(target)
    }

    const menuItem =  (
        <div className='listHeader border1 back_image'>
        <div className='headerItem'>KOSHER CHA CHA </div> 
        <div className='listMenu'>
            <AddUser toggleInput={toggleInput} />
            <GoToProfile handleRoomClick={handleRoomClick}/>
            <Logout/>
        </div>
        </div>
    )


    const addUserInput = (
        <div className='listHeader border1 back_image'>

        <InputForm
            inputError={inputError}
            placeholder={placeholder}
            handleSubmit={handleInput}
            cssClass={cssClass}
            submitCancel={toggleInput}
        />
        </div>
    )
    

    const currentComponent = () => {

        switch (targetid) {
            case "addUserInput":
                return addUserInput
        
            default:
                return menuItem
        }
    }
    
    return currentComponent()
}