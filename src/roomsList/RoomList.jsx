import RoomIcon from './RoomIcon'
import RoomCreator from './RoomCreator';

export default function RoomList(prop) {

  const chooseRoom = prop.chooseRoom
  const roomList = prop.roomList
  const rooms = prop.roomList.rooms

  function handleRoomClick(event) {
    console.dir(event)
    console.log("room clicked ",event)
    chooseRoom(event);
  }

  const getRoomContacts = (room) => {
    console.log("room in getcontacts method:", room)
    const roomContacts = {}
    room.members.map( id=> {
      roomContacts[id] = roomList.members[id]
    })
    return roomContacts
  }

  const getIcons = () => {
    if (rooms) {
      return (
        <div>
          <div id="sidebar"><h1>KOSHER CHA CHA</h1></div>
            <RoomCreator />
            {
              rooms.map((room) => {
                return (<RoomIcon key={room.id} 
                    room={room} 
                    members={getRoomContacts(room)} 
                    onClick={handleRoomClick} />
                )
              })
          }

      </div>
    )
    }
    return <p>waiting</p>
  }
  return getIcons()
}
