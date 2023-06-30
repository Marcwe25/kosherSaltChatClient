import { useState } from 'react';
import axios from "axios";
import { apiURL,registerURL } from '../utility/constsURL';
import { useNavigate } from 'react-router-dom';

export default function useRegistration() {
   
    const [registrationError, setRegistrationError] = useState(null);
    const navigate = useNavigate()

   const axiosRegistration = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    //register user
    const registerUser = async (inputs) => {
        if(isValid(inputs)) {
            const {userName,email,password} = {...inputs}
            return await axiosRegistration
            .post(
                registerURL,
                {userName,email,password}
                ,{withCredentials: true})
            .then(async () => {
                setRegistrationError("")
                navigate('/login');
            })
            .catch(() => {
                setRegistrationError("bad credential");})
        }

        }

    const isValid = (inputs) => {
        if (inputs.password===inputs.password_confirmation) return true
        setRegistrationError("passwords different")
        return false
    }

return {registerUser, registrationError}
}