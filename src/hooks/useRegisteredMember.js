import { useState,useEffect } from "react"
import { lastseen, member_url } from "../utility/constsURL";
import { useApi } from "./useApi";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utility/constNames';



export default function useRegisteredMember (setRoomId)  {

    const [registeredMember,setRegisteredMember] = useState(null)

    const {axiosInstance} = useApi()
    const local_refresh_token = localStorage.getItem(REFRESH_TOKEN)

    async function getUser  () {
      if(!registeredMember) {
        await findUser()
      }
      return registeredMember
    }
    console.log("inside useRegisteredMember")
    console.log("inside useRegisteredMember",registeredMember)

    useEffect(() => {

          if(!registeredMember && localStorage.getItem(ACCESS_TOKEN)) findUser()
       
     }, [local_refresh_token]);

     function sendLastSeen (roomid) {
      console.log("last seen sent")
        axiosInstance.get(lastseen+`${roomid}`)
     }

      // fetching username
     async function findUser() {
      await axiosInstance.get(member_url)
         .then(res => {
            setRegisteredMember(res?.data);
      })
    }
    console.log("inside useRegisteredMember",registeredMember)


     return {registeredMember,sendLastSeen,setRegisteredMember, getUser }
}


