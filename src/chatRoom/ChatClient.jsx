import { useState } from 'react';
import './ChatClient.css';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { useApi } from '../hooks/useApi';

const ChatClient = (prop) => {

    const n = Math.round(Math.random()*1000000)
    const messages = prop.messages
    console.log(`started reading ChatClient id ${n} with room ${prop.roomId}`)
    const roomId = prop.room.id
    const chooseRoom=prop.chooseRoom

    console.log("inside CHAT CLIENT ,", messages)
    const goBack = () => {
        chooseRoom(0);
      };


      return <div>
                <div onClick={goBack} className='thm-a'>GO BACK</div>
                <ChatDisplay 
                    roomId={roomId} 
                    messages={messages} />
                <ChatInput
                    sendMessage={prop.sendMessage}
                    roomId={roomId}
                    registeredMember={prop.registeredMember }/>
            </div>


}

export default ChatClient