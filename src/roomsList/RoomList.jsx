import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'
import useData from '../hooks/data-context'


export default function RoomList(props) {

  const rooms = props.roomList?.rooms
  const {chooseRoom} = useData()
  
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

            <RoomListMenu />

            <div className={`roomsContainer border1 back_image`}>
            {
              rooms.map((room) => {
                console.log("maping to icon room ", room)
                return (<RoomIcon key={room.id} 
                    room={room} 
                    members={getRoomContacts(room)} 
                    onClick={chooseRoom} />
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
