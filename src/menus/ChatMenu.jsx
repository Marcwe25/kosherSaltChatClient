
import AddUserToChat from '../icons/AddUserToChat';
import GoHome from '../icons/GoHome';
import GoHomeIcon from '../icons/GoHomeIcon';

export default function ChatMenu (props) {


    return (       
        
    <div className='listHeader border1'>
        <AddUserToChat 
            refreshRoomList={props.refreshRoomList}
            roomId={props.roomId}
        />

        <div className='headerItem headerTitle'>
            <div >{props.name}</div>
        </div>
        <GoHomeIcon/>
   
    </div>
    )
}