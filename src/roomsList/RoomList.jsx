import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'


export default function RoomList(props) {
  console.log("rendering roomlist")
  const chooseRoom = props.chooseRoom
  
  const rooms = props.roomList?.rooms

  const handleRoomClick = props.handleRoomClick


  const getRoomContacts = (room) => {
    const roomContacts = {}

    room.members.map( id=> 
      {
        roomContacts[id] = props.roomList.members[id]
      })
    return roomContacts
    }

  const getIcons = () => {
    if (rooms) {
      return (
        <div className='listContainer '> 
            <RoomListMenu handleRoomClick={handleRoomClick} />
            <div className={`roomsContainer border1 back_image`}>

            {
              rooms.map((room) => {
                console.log("maping to icon room ", room)
                return (<RoomIcon key={room.id} 
                    room={room} 
                    members={getRoomContacts(room)} 
                    onClick={handleRoomClick} />
                )
              })
          }</div>
           

      </div>
    )
    }
    return <p>waiting</p>
  }
  return getIcons()
}
