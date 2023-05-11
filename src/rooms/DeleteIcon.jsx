import { useEffect, useState, useRef } from "react";
import { room_url } from "../utility/constsURL";
import axiosInstance from "../axios/axiosBuilder"
import '../css/DeleteIcon.css';

const DeleteIcon = (prop) => {

    // const id = prop.roomId;
    // const handleRoomAdded = () => {
    //     prop.updateList();
    // }

    // const [enable,setEnable] = useState(true)
    // const didMount = useRef(false);

    // const handleDelete = async () => {
    //     const disableURL = room_url+"/delete"+"/"+id
    //     const newList = await axiosInstance.put(disableURL)
    //     setEnable(false)
    // }
    // useEffect(() => {
    //     if (didMount.current) handleRoomAdded();
    //     else didMount.current = true;
        
    //   }, [enable]);
      




    return <div className="pButton" 
    // onClick={handleDelete}
    >x</div>
}

export default DeleteIcon