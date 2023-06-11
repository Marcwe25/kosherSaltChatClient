import { useState, } from 'react';

const ChatInput = (props) => {

    const [message, setMessage] = useState('');
    const sendMessage=props.sendMessage
    const roomId = props.roomId
    const registeredMember= props.registeredMember 

    const handleMessageSubmit = (e) => {
      e.preventDefault();
        if (message.trim().length > 0) {
            const destination = `/app/${roomId}`;
            sendMessage(
                destination, 
                {
                    "dateTime": new Date(),
                    "from":registeredMember,
                    "content": message,
                    "enabled": true.toString,
                });
            setMessage('');
        }
    };

    return (
        <div className='listFoother border1'>
            <form onSubmit={handleMessageSubmit} className='chatInputForm back_image'>
                <textarea className='back_image fborder newRoomTextArea' rows="4" cols="30" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className='sendIcon'></button>
            </form>
        </div>
    );
};

export default ChatInput