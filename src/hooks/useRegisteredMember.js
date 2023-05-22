import { useState,useEffect } from "react"
import { member_url } from "../utility/constsURL";
import { useApi } from "./useApi";



export default function useRegisteredMember (setRoomId)  {

    const [registeredMember,setRegisteredMember] = useState(null)

    const {axiosInstance} = useApi()

    useEffect(() => {
        async function findUser() {
          await axiosInstance.get(member_url)
             .then(res => {
                console.log("fetched user data:",res.data) 
                setRegisteredMember(res?.data);
                setRoomId(0)
            //  setLoading(false);
          })
        //   . catch(err => {
        //      setLoading(false);
        //  });
       }
        findUser();
     }, []);

     return {registeredMember }
}



