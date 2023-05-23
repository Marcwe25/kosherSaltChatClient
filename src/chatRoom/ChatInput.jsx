import { useState, } from 'react';



const ChatInput = (prop) => {

    const [message, setMessage] = useState('');
    const sendMessage=prop.sendMessage
    const roomId = prop.roomId
    const registeredMember= prop.registeredMember 

    const handleMessageSubmit = (e) => {
      e.preventDefault();
      console.log("submiting")
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
        <div className='mainFormDiv'>
        <form onSubmit={handleMessageSubmit} className='chatInputForm'>
        <textarea rows="4" cols="30" value={message} onChange={(e) => setMessage(e.target.value)}/>

            
            
         
            <button type="submit">Send</button>
        </form>
        </div>
    );
};

export default ChatInput