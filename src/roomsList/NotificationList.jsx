import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'
import useData from '../hooks/data-context'
import DisabledRoomIcon from './DisabledRoomIcon'


export default function NotificatiolnList(props) {
  const {roomId,chooseRoom} = useData()
  const type = roomId.split("_")[1]
  const fetchNotificationList = () => {props.fetchNotificationList()}
  const {notificationList}=props
  const notifications=props.notificationList?.notifications
  const fetchRoomList= props.fetchRoomList

  !!notifications && console.log("RoomList222 notifications", notifications)
  !!notifications && console.log("RoomList333 NewContact", notifications["NewContact"])



    console.log("notificatonsljist",notifications)
  const getIcons = () => {
    if (notifications) {
      return (
        <div className='blockContainer '> 
            <RoomListMenu notificationList={notificationList}/>

            <div className={`roomsContainer border1 back_image`}>
            {!!notifications && notifications[type]
              .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
              .map((notification) =>  
                          <DisabledRoomIcon 
                              key={notification.id} 
                              notification={notification} 
                              fetchRoomList={fetchRoomList}
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
