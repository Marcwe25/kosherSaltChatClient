import SearchButton from '../icons/searchButton';
import MenuButton from '../icons/MenuButton';
import useAuth from '../hooks/auth-context';
import NotificationsMenu from './NotificationsMenu';

export default function RoomListMenu (props) {
    const notificationList=props.notificationList

    console.log("RoomListMenu notificationList", props.notificationList?.notifications["NewContact"])

    return (
        <div className='listHeader border1  '>
            <div className='headerItem headerTitle'>K</div> 
            <span>
                <NotificationsMenu notificationList={notificationList}/>
                <SearchButton/>
                <MenuButton/>
            </span>
        </div>
    )
}