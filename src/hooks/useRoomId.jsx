import { useState } from "react";



export default function useRoomId () {

    const [roomId,setRoomId] = useState(0)

    return {roomId,setRoomId}
}