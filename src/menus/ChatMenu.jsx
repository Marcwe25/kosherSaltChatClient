
import AddUserToChat from '../icons/AddUserToChat';
import GoHome from '../icons/GoHome';

export default function ChatMenu (props) {


    return (       
        
    <div className='listHeader border1 back_image'>
        <div className='headerItem'>
            <div>{props.name}</div>
             </div>
        <div className='listMenu'>

            <AddUserToChat 
                refreshRoomList={props.refreshRoomList}
                roomId={props.roomId}
            />

            <GoHome 
                handleRoomClick={props.handleRoomClick}

            />
        </div>
    </div>
    )
}