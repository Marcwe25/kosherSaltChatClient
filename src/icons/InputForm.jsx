import { useEffect } from "react"
import { useState } from "react"
import Confirm from "./Confirm"
import Cancel from '../icons/Cancel';


export default function InputForm (props) {

        const handleInput = props.handleInput
        const placeholder = props.placeholder
        const  inputError = props.inputError
        const  formVisible = props.formVisible
        const [inputs, setInputs] = useState({inputValue:""})

        const handleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({...values, [name]: value}))
        }
  
        const submitHandler = async (event) => {
            event.preventDefault();
            await handleInput(inputs)
        }

        const submitCancel = async (event) => {
            props.submitCancel("menu")
        }


        return (
            <div className="icon-input-container">
                <form method="post" onSubmit={submitHandler}>			
                    <div className="item">
                    <input type="text" 
                                className= {`${formVisible?'itemOpen':'itemClose'}`}
                                name="inputValue" 
                                placeholder={placeholder}  
                                value={inputs.inputValue} 
                                onChange={handleChange}/>
                    </div>
                    {/* <p className='error'>{inputError?.length>0?inputError:""}</p> */}
                <div className="listMenu" >
                    <Confirm submitConfirm={submitHandler}/>
                    <Cancel submitCancel={submitCancel}/>
                </div>
            </form>
            </div>
            )
        }