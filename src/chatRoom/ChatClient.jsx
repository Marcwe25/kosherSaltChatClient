import './ChatClient.css';
import './Input.css';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatMenu from '../menus/ChatMenu';
import useData from '../hooks/data-context';

const ChatClient = (props) => {
    const {roomId} = useData()
    const roomList = props.roomList

    const getRoomObject = () => {
            const room = roomList?.rooms.find(room => room.id === roomId )
            room.membersDetails = room.members.reduce((a, memberid) => (
                 { ...a, [memberid]: roomList.members[memberid]}), {}) 
            return room
    }

    const room = getRoomObject()

    return  <div className='blockContainer'>

                <ChatMenu 
                    refreshRoomList={props.refreshRoomList}
                    handleRoomClick={props.handleRoomClick} 
                    name={room.name}
                    roomId={room.id}
                />
                <ChatDisplay
                    chatMessages={props.chatMessages}
                    setChatMessages={props.setChatMessages}
                    room={room}
                    roomList={roomList}
                    />
                <ChatInput
                    sendMessage={props.sendMessage}
                    roomId={room.id}
                    />
            </div>
}
export default ChatClient