import useAuthentication from '../hooks/useAuthentication';
import useRoomId from '../hooks/useRoomId';
import AddUser from '../icons/AddUser';
import useAuth from "../hooks/auth-context";
import GoToProfile from '../icons/GoToProfile';
import Logout from '../icons/Logout';

export default function RoomListMenu (props) {

    const handleRoomClick = props.handleRoomClick

    const {logout} = useAuthentication()
    
    function handleLogout () {
        logout()
    }


    return (       
    <div className='listHeader border1 back_image'>
        <div className='headerItem'>KOSHER CHA CHA </div>
        <div className='listMenu'>
            <AddUser/>
            <GoToProfile handleRoomClick={handleRoomClick}/>
            <Logout/>
        </div>
    </div>
    )
}