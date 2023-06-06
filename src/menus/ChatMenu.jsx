
import GoHome from '../icons/GoHome';

export default function ChatMenu (props) {

    const handleRoomClick = props.handleRoomClick

    let members = ""
    
    Object.values(props.members).forEach(element => {
        members = members + element.username.split('@')[0] + ", "
    });

    members = members.slice(0, -2)

    console.log("members",members)
    return (       
    <div className='listHeader border1 back_image'>
        <div className='headerItem'>{members} </div>
        <div className='listMenu'>
            <GoHome handleRoomClick={handleRoomClick}/>
        </div>
    </div>
    )
}