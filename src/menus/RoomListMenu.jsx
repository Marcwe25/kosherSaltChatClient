import SearchButton from '../icons/searchButton';
import MenuButton from '../icons/MenuButton';
import NotificationsMenu from './NotificationsMenu';

export default function RoomListMenu (props) {
    const notificationList=props.notificationList

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