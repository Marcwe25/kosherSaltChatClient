import { useState, } from 'react';
import { room_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';
import Confirm from '../icons/Confirm';
import Cancel from '../icons/Cancel';
import useData from '../hooks/data-context';



const NewRoom = (prop) => {

    const {goBack} = useData()

    const {axiosInstance} = useApi()

    const [input, setInput] = useState({username:"",message:""});

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
	  }


    const submitConfirm = (e) => {
      e.preventDefault();
        if (input.trim().length > 0) {
            const array = input.split(',');
            axiosInstance.post(room_url,array)
            setInput('');
        }
    };

    const submitCancel = () => {
        goBack()
    }

    return (
        <div className=' midContainer'>
            <form className='chatInputForm back_image'>
                <input
                    type='email' 
                    placeholder='username to add' 
                    className='standart' value={input.username} 
                    onChange={handleChange}
                />

                <textarea 
                    rows="4" 
                    cols="30" 
                    placeholder='message' 
                    className='standart' value={input.message} 
                    onChange={handleChange}
                />

                <span className='standart'>
                    <Cancel submitCancel={submitCancel}/>
                    <Confirm submitConfirm={submitConfirm}/>
                </span>
            </form>
        </div>
    );
};

export default NewRoom