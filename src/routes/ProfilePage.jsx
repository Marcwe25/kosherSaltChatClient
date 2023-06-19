import React,{useState} from 'react'
import { member_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';
import useAuth from '../hooks/auth-context';
import Confirm from '../icons/Confirm';
import Cancel from '../icons/Cancel';
import useData from '../hooks/data-context';

export default function Profile () {

    const [success,setSuccess] = useState(false)
    const {axiosInstance} = useApi()

    const {registeredMember} = useAuth()
	const [inputs, setInputs] = useState({username:"",displayName:""})

	const handleChange = (event) => {
		
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

    const {goBack} = useData()



	const successful = () => {
        setSuccess("updated successfully")
        setTimeout(() => {
            goBack()
        }, 2000);
    }


    const UpdateUser = async (e) => {
		e.preventDefault();
        await axiosInstance.put(member_url, inputs,{withCredentials: true})
        successful()
        }


		return (
		<div className="blockContainer ">
			<div className='listHeader border1  '>
				<div className='headerItem headerTitle'>K</div> 

                <span className='standart'>
                        <Cancel/>
                        <Confirm submitConfirm={UpdateUser}/>
                    </span>
                </div>
			<form method="post"  className='userData'>			
		        <h1>Profile</h1>
                <p className="item">
		          <input 
				  	readOnly="readonly"
				  	type="email" 
					name="email"  
					value={inputs.username}
					placeholder= {registeredMember?.username }
					onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <input 
				  	type="text" 
					name="displayName"  
					value={inputs.displayName} 
					placeholder= {registeredMember?.displayName ? registeredMember.displayName : "choose display name" }
					onChange={handleChange}/>
		        </p>

				{success && (<div className='success'>updated successfully</div>)}

		   </form>

		   		</div>
		)
    
}