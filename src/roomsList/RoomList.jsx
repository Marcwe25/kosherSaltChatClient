import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'
import useData from '../hooks/data-context'
import { useState } from 'react'

export default function RoomList(props) {
  const [searchInput,setSearchInput] = useState("")
  const {notificationList}=props

  const rooms = searchInput.length && props.roomList?.rooms.filter(r => r.name.includes(searchInput)) || props.roomList?.rooms 

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
                <RoomListMenu notificationList={notificationList} setSearchInput={setSearchInput} searchInput={searchInput} />
                <div className={`roomsContainer scrolable border1 back_image`}>
                {rooms && rooms
                .filter(room=>room.memberRoomEnable)
                .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
                .map((room) =>  enabledRoom(room))}
                </div>
          </div>
          )
}
