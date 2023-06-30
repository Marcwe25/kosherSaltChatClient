import React,{useState} from 'react'
import './Login.css'
import useAuthentication from '../hooks/useAuthentication'
import Registration from "./Registration"


function Login() {
	const [inputs, setInputs] = useState({email:"",password:""})
	const {loginUser, authenticationError} = useAuthentication()
	
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
		return <Registration/>
	}
 
	return (
		<div className="login-container userData">
			<form method="post" onSubmit={submitHandler} className='loginForm'>			
		        <h1>Login</h1>
		        <p className="item">
		          <input type="email"  name="email" placeholder='username'  value={inputs.email} onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <input type="password" name="password" placeholder='password' value={inputs.password} onChange={handleChange} />
		        </p>
		        <p >
				<input type="button" value="register" className="submit_button" onClick={goToRegistration}/>

		          <input type="submit" value="login" className="submit_button"/>

		        </p>
				<p className='error'>{authenticationError?.length>0?authenticationError:""}</p>
		   </form>
		</div>
		)
}

export default Login