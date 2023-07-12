import React,{useState} from 'react'
import './Login.css'
import useAuthentication from '../hooks/useAuthentication'
import Registration from "./Registration"
import { useEffect } from 'react'
import GoogleLogin from './GoogleLogin'
import { LOCALSTORAGE } from 'localforage'
import { ACCESS_TOKEN } from '../utility/constNames'
import RememberMe from './RememberMe'



function Login(props) {


    const [remember, setRemember] = useState()

	const [inputs, setInputs] = useState({email:"",password:""})
	const {loginUser, authenticationError} = useAuthentication()
	const goToPage = props.goToPage
	const {setUserDetail} = useAuthentication()

	const doRemember = async () => {
		if(remember){
			const accessToken = localStorage.getItem(ACCESS_TOKEN)
			accessToken &&  await setUserDetail()
		}
	}
	useEffect(()=>{
		doRemember()

	},[remember])


	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		await loginUser(inputs)
	}

	const goToRegistration = () => {
		goToPage("registration")
	}
 
	return (
		<div >
			<div className="login-container back_image">

			<form method="post" onSubmit={submitHandler} className='loginForm'>	

							<div className='titleBack'>
							<p className='loginTitle'><span className='bigger headerTitle '>K</span> <span className='big'>chat</span></p>

				</div>


				<div className='inputField'>
					<div className='profileIcon iconPlacement'/>

					<input
						className='p0'
						type="email"  
						name="email" 
						placeholder='username'  
						value={inputs.email} 
						onChange={handleChange}
						/>
				</div>

				<div className='inputField'>
					<div className='lockIcon iconPlacement'/>

					<input
						className='p0'
						type="password"  
						name="password" 
						placeholder='password'  
						value={inputs.password} 
						onChange={handleChange}
						/>
				</div>

				<input type="submit" value="login" className="submit_button clickable"/>


		        <div className='loginLinks1'>
					<RememberMe setRemember={setRemember} remember={remember}/>
					<div className='clickable2' onClick={goToRegistration}>forgot password</div>
		        </div>

		        <div className='loginLinks1'>
					<div className='clickable2' onClick={goToRegistration}>register</div>
					<div className='clickable2' onClick={goToRegistration}>contact us</div>
		        </div>

				<div className='loginLinks1 m10'>
				<div className='q2'/>
				<span className='q1'>
					or 
				</span>
				<div className='q2'/>
				</div>



				<GoogleLogin/>

				<p className='error'>{authenticationError?.length>0?authenticationError:""}</p>
		   </form>
		   </div>

		</div>
		)
}

export default Login