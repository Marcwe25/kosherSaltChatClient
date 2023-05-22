import './ChatClient.css';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

const ChatClient = (prop) => {

    const n = Math.round(Math.random()*1000000)
    console.log(`started reading ChatClient id ${n} with room ${prop.roomId}`)
    const roomId = prop.room.id
    const setRoomId=prop.setSelected
    const isConnected=prop.stompConnected
    const messages=prop.StompMessages

    const goBack = () => {
        // subscription.current.unsubscribe();
        setRoomId(0);
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