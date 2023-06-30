
import AddUserToChat from '../icons/AddUserToChat';
import GoHomeIcon from '../icons/GoHomeIcon';

export default function ChatMenu (props) {


    return (       
        
    <div className='flexHeader border1'>
        <AddUserToChat/>
        <div className='headerItem headerTitle'>
            <div >{props.name}</div>
        </div>
        <GoHomeIcon/>
   
    </div>
    )
}