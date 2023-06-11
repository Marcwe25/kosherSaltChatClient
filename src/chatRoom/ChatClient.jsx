import './ChatClient.css';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatMenu from '../menus/ChatMenu';

const ChatClient = (props) => {

    return  <div className='listContainer'>

                <ChatMenu 
                    refreshRoomList={props.refreshRoomList}
                    handleRoomClick={props.handleRoomClick} 
                    name={props.room.name}
                    roomId={props.room.id}
                />
                <ChatDisplay
                    chatMessages={props.chatMessages}
                    room={props.room}
                    />
                <ChatInput
                    sendMessage={props.sendMessage}
                    roomId={props.room.id}
                    registeredMember={props.registeredMember }/>
            </div>


}

export default ChatClient