import GoBack from "../icons/GoBack";
import AddUser from "../icons/AddUser";
import GoToProfile from "../icons/GoToProfile";
import Logout from "../icons/Logout";
import GoHome from "../icons/GoHome";
import RoomListMenu from '../menus/RoomListMenu'
import NotificationsMenu from './NotificationsMenu';
import SearchButton from '../icons/searchButton';
import MenuButton from '../icons/MenuButton';
import GoHomeIcon from "../icons/GoHomeIcon";
export default function AppMenu (props) {
    const notificationList=props.notificationList


    return (
        <div className='blockContainer '> 
                    <div className='listHeader border1  '>
            <div className='headerItem headerTitle'>K</div> 
            <span>
                <GoHomeIcon/>
            </span>
        </div>
            <div className="appMenu back_image">
            <AddUser/>
            <GoToProfile />
            <Logout/>
            </div>
 
       

  </div>

    )
}

