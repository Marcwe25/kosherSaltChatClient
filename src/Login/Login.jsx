import React,{useState} from 'react'
import { useNavigate} from "react-router-dom"
import {loginURL} from '../utility/constsURL'
import axiosLogin from '../axios/axiosLogin'
import './Login.css'
import { setTokens } from '../token/tokenUtility'



function Login() {
	const [inputs, setInputs] = useState({email:"",password:""})
	const navigate = useNavigate();
	const [errorMessage,setErrorMessage] = useState("");

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		try{
			const response = await axiosLogin.post(loginURL,inputs,{withCredentials: true})

			if (response.data.access_token && response.data.refresh_token) {
								console.log("succesfull login")
								console.dir(response)
								const got_access_token = response.data.access_token
								const got_refresh_token = response.data.refresh_token
								setTokens(got_access_token,got_refresh_token)
								navigate ("/") }
						else {
								console.error("unsuccesfull login")
								console.dir(response)
								setErrorMessage("bad credential")}
								}
				catch (error) {
						console.error("error with axios login")
						console.dir(error)
						setErrorMessage("bad credential")
						}
	}


	return (
		<div className="login-container">
			<form method="post" onSubmit={submitHandler}>			
		        <h1>Login</h1>
		        <p className="item">
		          <label htmlFor="email">email</label>
		          <input type="email" name="email"  value={inputs.email} onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <label htmlFor="password">Password</label>
		          <input type="password" name="password" value={inputs.password} onChange={handleChange} />
		        </p>
		        <p >
		          <input type="submit" className="submit_button"/>
		        </p>
				<p className='error'>{errorMessage.length>0?errorMessage:""}</p>
		   </form>
		</div>
		)
}

export default Login