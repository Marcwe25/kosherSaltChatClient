import React,{useState} from 'react'
import './Login.css'
import useAuthentication from '../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom';



function Login() {
	const [inputs, setInputs] = useState({email:"",password:""})
	const {loginUser, authenticationError} = useAuthentication()
	let navigate = useNavigate();

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		await loginUser(inputs)

		navigate('/');

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
				<p className='error'>{authenticationError?.length>0?authenticationError:""}</p>
		   </form>
		</div>
		)
}

export default Login