import { NEW_ROOM, NEW_ROOM_MENU } from "../utility/constNames"
import useData from '../hooks/data-context';

export default function NewContactNotification (props) {
    const {chooseRoom} = useData()

    const n = props.newContacts.length
    const handleClick = () => {
        chooseRoom(NEW_ROOM)
      }

    return (
        <span className="buttonCompo" onClick={handleClick}>
            <div className='addUserIcon menuButton' />
            <span className="buttonTxt">{n}</span>
            </span>
    )
}

