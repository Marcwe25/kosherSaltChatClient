import { useState, } from 'react';
import { room_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';



const RoomCreator = (prop) => {
    const {axiosInstance} = useApi()

    const [input, setInput] = useState('');

    const registeredMember= prop.registeredMember 

    const handleMessageSubmit = (e) => {
      e.preventDefault();
        if (input.trim().length > 0) {
            const array = input.split(',');

            axiosInstance.post(room_url,array)
            setInput('');
        }
    };

    return (
        <div className='mainFormDiv'>
        <form onSubmit={handleMessageSubmit} className='chatInputForm'>
        <textarea rows="4" cols="30" value={input} onChange={(e) => setInput(e.target.value)}/>

            
            
         
            <button type="submit">Send</button>
        </form>
        </div>
    );
};

export default RoomCreator