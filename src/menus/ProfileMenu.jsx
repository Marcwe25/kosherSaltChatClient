import useAuthentication from '../hooks/useAuthentication';
import useRoomId from '../hooks/useRoomId';
import AddUser from '../icons/AddUser';
import useAuth from "../hooks/auth-context";
import GoHome from '../icons/GoHome';

export default function ProfileMenu (props) {

    const handleRoomClick = props.handleRoomClick

    const {logout} = useAuthentication()


    return (       
    <div className='listHeader border1 back_image'>
        <div className='headerItem'>PROFILE</div>
        <div className='listMenu'>
            <GoHome handleRoomClick={handleRoomClick}/>
        </div>
    </div>
    )
}