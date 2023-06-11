import { useState,useEffect,useRef } from "react"
import { lastseen, member_url } from "../utility/constsURL";
import { useApi } from "./useApi";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utility/constNames';



export default function useRegisteredMember ()  {

  const [registeredMember,setRegisteredMember] = useState(null)

    const {axiosInstance} = useApi()

    async function findUser() {
      await axiosInstance.get(member_url)
         .then(res => {
            setRegisteredMember(res?.data);
      })
    }

    useEffect (()=>{
      setRegisteredMember(registeredMember => {
          if(!registeredMember) {
            findUser(registeredMember)
          }
        }
      )
    },[])


    const getUser = () => {
      console.log("getting user")
      findUser().then(()=>{return registeredMember})
    }


     function sendLastSeen (roomid) {
      console.log("last seen sent")
        axiosInstance.get(lastseen+`${roomid}`)
     }

      // fetching username
     async function findUser(y) {
      console.log(" y findingUser from get user",y)
      await axiosInstance.get(member_url)
         .then(res => {
            console.log("findingUser from get user")
            setRegisteredMember(res?.data);
      })
    }

    
      // // fetching username
      // async function findUser() {
      //   setRegisteredMember(registeredMember => {
      //     if(!registeredMember){
      //       return 
      //     }
      //   })
      // }

    return {registeredMember, sendLastSeen,setRegisteredMember, getUser }
}


