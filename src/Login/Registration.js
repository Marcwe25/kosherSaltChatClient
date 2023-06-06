 import React,{useState} from 'react'
import './Login.css'
import useRegistration from '../hooks/useRegistration';
import { useNavigate } from 'react-router-dom';
  
function Registration() {

	const {registerUser,registrationError} = useRegistration()
	const [inputs, setInputs] = useState({
		userName:"",
		email:"",
		password_confirmation:"",
		password:""})
	let navigate = useNavigate();

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		await registerUser(inputs)

		// navigate('/login');
	}

	const goToLogin = () => {
		navigate('/login');
	}  
    
	return (
		<div className="login-container">
			<form method="post" onSubmit={submitHandler}>			
		        <h1>Register</h1>
		        <p className="item">
		          <input type="text" name="userName" placeholder='username'  value={inputs.userName} onChange={handleChange}/>
		        </p>
				<p className="item">
		          <input type="email" name="email" placeholder='email'  value={inputs.email} onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <input type="password" name="password" placeholder='password' value={inputs.password} onChange={handleChange} />
		        </p>
				<p className="item">
		          <input type="password" name="password_confirmation" placeholder='confirm password' value={inputs.password_confirmation} onChange={handleChange} />
		        </p>
		        <p >
		         	<input type="button" value="go to login" className="submit_button"  onClick={goToLogin}/>
					 <input type="submit" value="register" className="submit_button"/>

		        </p>
				<p className='error'>{registrationError?.length>0?registrationError:""}</p>
		   </form>
		</div>
		)
}
export default Registration;