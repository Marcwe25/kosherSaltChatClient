import { createContext, useContext } from "react";
import { useRef } from "react";
import { useState , useMemo} from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [roomHistory,setRoomHistory] = useState([0])
    const [roomId,setRoomId] = useState(0)
    const [currentRoom,setCurrentRoom] = useState(0) //remove this field ?????????
    const preRoomChange = useRef()

    
    const resetRoomHistory = () => {
      setRoomHistory([0])
      setRoomId(0)
      setCurrentRoom(0)
      preRoomChange.current = null
    }

    const setPreRoomChange = (fr) => {preRoomChange.current = fr}

    const chooseRoom = (event) => {
      if(typeof preRoomChange === 'function') preRoomChange.current()
      if(roomId!==roomHistory.slice(-1)[0]){
        setRoomHistory(prevRoomHistory=>[...prevRoomHistory,roomId])
      }
      if(!isNaN(event)) {setCurrentRoom(event)}
      setRoomId(event)
    }

    const goBack = () => {
      const prev = roomHistory.slice(-1)[0]
      const newArr = roomHistory.length>1 ? roomHistory.slice(0,-1) : [0]
      setRoomHistory(newArr)
      setRoomId(prev)
    }

    
    const previousRoomId = () => {
        return roomHistory.slice(-1)[0]
    }


    const value = useMemo(
      () => ({
        resetRoomHistory,
        chooseRoom,
        roomId,
        previousRoomId,
        currentRoom,
        goBack
      }),
      [roomId]
    );

    return <DataContext.Provider value={{...value,setPreRoomChange:setPreRoomChange}}>{children}</DataContext.Provider>;

}

export default function useData() {
    return useContext(DataContext); 
}