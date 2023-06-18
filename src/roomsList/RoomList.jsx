import RoomIcon from './RoomIcon'
import RoomListMenu from '../menus/RoomListMenu'
import useData from '../hooks/data-context'
import DisabledRoomIcon from './DisabledRoomIcon'
import { linkToRoom_url, unlinkFromRoom_url } from '../utility/constsURL'
import { useApi } from '../hooks/useApi'


export default function RoomList(props) {

  const {notificationList}=props
  const fetchRoomList = props.fetchRoomList
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
    const {axiosInstance} = useApi()

    const unlinkFromRoom = async (room) => {
      await axiosInstance.put(unlinkFromRoom_url+"/" +room.id)
      fetchRoomList()
    }

    const linkFromRoom = async (room) => {
      await axiosInstance.put(linkToRoom_url+"/" +room.id)
      fetchRoomList()
    }

    const enabledRoom = (room) => {
      return (<RoomIcon key={room.id} 
                        room={room} 
                        members={getRoomContacts(room)} 
                        onClick={chooseRoom} />
      )
    }

    const disabledRoom = (room) => {
      return (<DisabledRoomIcon key={room.id} 
                                room={room} 
                                members={getRoomContacts(room)}
                                submitCancel={unlinkFromRoom}
                                submitConfirm={linkFromRoom}
                                />
      )
    }





  const getIcons = () => {
    if (rooms) {
      return (
        <div className='blockContainer '> 
            <RoomListMenu notificationList={notificationList}/>
            <div className={`roomsContainer border1 back_image`}>
            {rooms
            .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
            .map((room) =>  enabledRoom(room))}
            </div>
           

      </div>
    )
    
    }
    return <p>waiting</p>
  }
  return getIcons()
}
