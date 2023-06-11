import { useState, } from 'react';
import { room_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';



const NewRoom = (prop) => {
    const {axiosInstance} = useApi()

    const [input, setInput] = useState({username:"",message:""});

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
	  }


    const handleMessageSubmit = (e) => {
      e.preventDefault();
        if (input.trim().length > 0) {
            const array = input.split(',');
            axiosInstance.post(room_url,array)
            setInput('');
        }
    };

    return (
        <div className=' border1'>
        <form onSubmit={handleMessageSubmit} className='chatInputForm back_image'>
            <input
                type='email' 
                placeholder='username to add' 
                className='newRoomTextArea' value={input.username} 
                onChange={handleChange}
            />

            <textarea 
                rows="4" 
                cols="30" 
                placeholder='message' 
                className='newRoomTextArea' value={input.message} 
                onChange={handleChange}
            />
                
        <button type="submit" className='newRoomButton'>+</button>
        </form>
        </div>
    );
};

export default NewRoom