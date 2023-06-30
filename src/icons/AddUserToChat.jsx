import useData from '../hooks/data-context';
import { ADD_TO_CHAT_PAGE } from "../utility/constNames"


export default function AddUserToChat () {

  const {chooseRoom} = useData()

  const handleClick = () => {
    chooseRoom(ADD_TO_CHAT_PAGE)
  }

    return (       
        <div 
        className= 'addUserIcon menuButton' 
        onClick={handleClick}>
        </div>
    )
}