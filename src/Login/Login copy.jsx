import React,{useState} from 'react'
import './Login.css'
import useAuthentication from '../hooks/useAuthentication'
import Registration from "./Registration"
import { useEffect } from 'react'
import GoogleLogin from './GoogleLogin'


function Login(props) {



	const [inputs, setInputs] = useState({email:"",password:""})
	const {loginUser, authenticationError} = useAuthentication()
	const goToPage = props.goToPage

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
		<div className="login-container userData">
			<form method="post" onSubmit={submitHandler} className='loginForm'>			
		        <h1>Login</h1>

		        {/* <div className="item">
		          <input type="email"  name="email" placeholder='username'  value={inputs.email} onChange={handleChange}/>
		        </div> */}

				<div className="fieldConatiner" >
						<div className='profileIcon menuButton' />
						<input type="email"  name="email" placeholder='username'  value={inputs.email} onChange={handleChange}/>
						{/* <span className="buttonTxt">PROFILE</span> */}
                </div>

		        <div className="fieldConatiner">
					<div className='profileIcon menuButton' />
		          	<input type="password" name="password" placeholder='password' value={inputs.password} onChange={handleChange} />
		        </div>


		        <div >
				<input type="button" value="register" className="submit_button" onClick={goToRegistration}/>

		          <input type="submit" value="login" className="submit_button"/>

		        </div>


				<GoogleLogin/>
				<p className='error'>{authenticationError?.length>0?authenticationError:""}</p>
		   </form>
		</div>
		)
}

export default Login