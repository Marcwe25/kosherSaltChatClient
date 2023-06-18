import { useState, } from 'react';
import { room_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';
import Confirm from '../icons/Confirm';
import Cancel from '../icons/Cancel';
import useData from '../hooks/data-context';
import useAuthentication from '../hooks/useAuthentication';
import useAuth from '../hooks/auth-context';
import { APP_MENU } from '../utility/constNames';



const NewRoom = (prop) => {

    const {goBack} = useData()

    const {axiosInstance} = useApi()
    const [errorMess, setErrorMess] = useState("")
    const [input, setInput] = useState({username:"",message:""});
    const {registeredMember} = useAuth()
    const {chooseRoom} = useData()
    const [successMessage,setSuccessMessage]=useState("")

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
        setErrorMess(null)

	  }


      const successful = () => {
        setSuccessMessage("user added successfully")
        setTimeout(() => {
            chooseRoom(APP_MENU)
        }, 2000);
    }

    const submitConfirm = (e) => {
      e.preventDefault();
        if(input.username.trim()==registeredMember.username) {
            // console.error("can't add yourself")
            setErrorMess("can't add yourself")
            return}
        if (input.username.trim().length > 0) {
            const contactRequest = {
                "from": registeredMember.id,
                "to": input.username,
                "message": input.message,
                "issued": new Date()
              }
            axiosInstance.post(room_url,contactRequest)
            setInput({username:"",message:""});
            successful()
        }
    };

    const submitCancel = () => {
        goBack()
    }

    return (
        <div >
            <div className='blockContainer'>
            <div className='listHeader border1 inverseFlexDirection '>
                <span className='standart'>
                        <Cancel submitCancel={submitCancel}/>
                        <Confirm submitConfirm={submitConfirm}/>
                    </span>
                </div>
                <div className='roomsContainer border1 back_image'>
                    <div className='formContainer'>
                        <form className='roomsContainer border1 back_image'>
                            <input
                                type='email' 
                                name='username'
                                placeholder='username to add' 
                                className='standart'
                                value={input.username} 
                                onChange={handleChange}
                            />

                            <textarea 
                                rows="4" 
                                cols="30" 
                                name='message'
                                placeholder='message' 
                                className='standart' value={input.message} 
                                onChange={handleChange}
                            />
                            {errorMess ? <div className='error'>{errorMess}</div>:null}
                            {successMessage ? <div className='success'>{successMessage}</div>:null}

                        </form>
                    </div>
                
                </div>
            </div>

        </div>
    );
};

export default NewRoom