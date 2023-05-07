import { useState } from "react";
import axiosInstance from "../axios/axiosBuilder";
import { chatRoom_url } from "../utility/constsURL";
import { useNavigate } from "react-router-dom";


const ContactFinder = (prop)=> {

    const [input, setInputs] = useState("")

    const handleChange = (event) => {
		const value = event.target.value;
		setInputs(value)
	  }

    const handleRoomAdded = () => {
        prop.updateList();
    }
    
    const addContactHandler = async (event) => {
        event.preventDefault();
        try{
            const response = await axiosInstance.post(chatRoom_url,[input])
            if (response.data) {
                console.log("successfuly added " + input)
                setInputs("")
                handleRoomAdded()
            } else {}
        } catch (error) {
            console.log("error adding user")
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={addContactHandler}>
                <p className="item">
		          <label htmlFor="email"/>
		          <input type="email" name="email"  value={input} onChange={handleChange}/>
		        </p>
            </form>

        </div>
    )
}

export default ContactFinder