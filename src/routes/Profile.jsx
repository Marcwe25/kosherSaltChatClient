import React,{useState} from 'react'
// import './Login.css'
import { useNavigate } from 'react-router-dom';
import { member_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';
import ProfileMenu from '../menus/ProfileMenu';
import useAuth from '../hooks/auth-context';

export default function Profile (props) {

    const [success,setSuccess] = useState(false)
    const chooseRoom = props.chooseRoom
    const {axiosInstance} = useApi()

    const {registeredMember} = useAuth()
	const [inputs, setInputs] = useState({...registeredMember})

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

    const successMessage = success ? "UPDATED SUCCESSFULLY" : ""

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		await UpdateUser(inputs)
	}

    const UpdateUser = async (inputs) => {
        return await axiosInstance
            .put(member_url, inputs,{withCredentials: true})
            .then(async (response) => {
                setSuccess(true)
                })
            
            .catch(err => console.error(err))
        }
		function handleRoomClick(event) {
			chooseRoom(event);
		}
	return (
		<div className="listContainer ">
            <ProfileMenu />
			<form method="post" onSubmit={submitHandler} className='userData'>			
		        <h1>Profile</h1>
                <p className="item">
		          <input 
				  	type="email" 
					name="email"  
					value={inputs.email}
					placeholder= {registeredMember?.username }
					onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <input 
				  	type="text" 
					name="displayName"  
					value={inputs.displayName ? inputs.displayName  : inputs.email} 
					placeholder= {registeredMember?.displayName }
					onChange={handleChange}/>
		        </p>

		        <p >
		          <input type="submit" className="submit_profile_update"/>
		        </p>
				{/* <p className='error'>{authenticationError?.length>0?authenticationError:""}</p> */}
		   </form>
           <div>{successMessage}</div>
		</div>
		)
    
}