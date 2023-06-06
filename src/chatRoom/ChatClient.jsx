import { useEffect } from 'react';
import './ChatClient.css';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import GoHome from '../icons/GoHome';
import ChatMenu from '../menus/ChatMenu';

const ChatClient = (props) => {

    const chatMessages = props.chatMessages
    const setChatMessages = props.setChatMessages
    const roomId = props.room.id
    const handleRoomClick = props.handleRoomClick

      useEffect(()=>{

        return 
      },[])

    return  <div className='listContainer'>

                <ChatMenu handleRoomClick={handleRoomClick} members={props.members}/>
                <ChatDisplay
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                    room={props.room}
                    members={props.members}  />
                <ChatInput
                    sendMessage={props.sendMessage}
                    roomId={roomId}
                    registeredMember={props.registeredMember }/>
            </div>


}

export default ChatClient