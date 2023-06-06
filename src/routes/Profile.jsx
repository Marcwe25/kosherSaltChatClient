import React,{useState} from 'react'
// import './Login.css'
import useAuthentication from '../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom';
import { member_url } from '../utility/constsURL';
import useRegisteredMember from '../hooks/useRegisteredMember';
import { useApi } from '../hooks/useApi';
import ProfileMenu from '../menus/ProfileMenu';
export default function Profile (props) {

    const [success,setSuccess] = useState(false)
    const chooseRoom = props.chooseRoom
    const {axiosInstance} = useApi()
    let navigate = useNavigate();

    const {registeredMember } = useRegisteredMember()
	const [inputs, setInputs] = useState({...registeredMember})

	
    const goto = () => {
        chooseRoom(0)
    }
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
            <ProfileMenu handleRoomClick={handleRoomClick} />
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
					value={inputs.displayName} 
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