import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'
import useData from '../hooks/data-context'

export default function RoomList(props) {

  const {notificationList}=props
  const rooms = props.roomList?.rooms
  const {chooseRoom} = useData()
  
  const getRoomContacts = (room) => {
    const roomContacts = {}
    room.members.map( id=> roomContacts[id] = props.roomList.members[id])
    return roomContacts
    }

    const enabledRoom = (room) => {
      return (<RoomIcon key={room.id} 
                        room={room} 
                        members={getRoomContacts(room)} 
                        onClick={chooseRoom} />
      )
    }

  return (
            <div className='blockContainer '> 
                <RoomListMenu notificationList={notificationList}/>
                <div className={`roomsContainer border1 back_image`}>
                {rooms && rooms
                .filter(room=>room.memberRoomEnable)
                .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
                .map((room) =>  enabledRoom(room))}
                </div>
          </div>
          )
}
