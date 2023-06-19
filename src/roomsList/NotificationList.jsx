import useData from '../hooks/data-context'
import DisabledRoomIcon from './DisabledRoomIcon'
import NotificationsMenu from '../menus/NotificationsMenu'
import SearchButton from '../icons/searchButton'
import GoHomeIcon from '../icons/GoHomeIcon'
import { NOTIFICATION_LIST } from '../utility/constNames'


export default function NotificatiolnList(props) {
  const {roomId} = useData()
  const type = typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST) ? roomId.split("_")[1] : null
  const fetchNotificationList = () => {props.fetchNotificationList()}
  const {notificationList}=props
  const notifications=props.notificationList?.notifications
  const fetchRoomList= props.fetchRoomList
  
  const getIcons = () => {
    if (notifications) {
      return (
        <div className='blockContainer '> 
            {/* <RoomListMenu notificationList={notificationList}/> */}


            <div className='listHeader border1  '>
                <div className='headerItem headerTitle'>K</div> 
                <span>
                    <NotificationsMenu notificationList={notificationList}/>
                    <SearchButton/>
                    <GoHomeIcon cf={fetchRoomList}/>
                </span>
            </div>
            <div className={`roomsContainer border1 back_image`}>
            {!!notifications && notifications.hasOwnProperty(type) && notifications[type]
              .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
              .map((notification) =>  
                          <DisabledRoomIcon 
                              key={notification.id} 
                              notification={notification} 
                              fetchNotificationList={fetchNotificationList}
                          />
                    )
            }
            </div>
           

      </div>
    )
    
    }
    return <p>waiting</p>
  }
  return getIcons()
}
