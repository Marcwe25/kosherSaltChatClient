import { createContext, useContext } from "react";
import { useState , useMemo} from "react";
import { set } from "react-hook-form";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [roomHistory,setRoomHistory] = useState([0])
    const [roomId,setRoomId] = useState(0)
    const [currentRoom,setCurrentRoom] = useState(0)

    const chooseRoom = (event) => {
      if(roomId!==roomHistory.slice(-1)[0]){
        setRoomHistory(prevRoomHistory=>[...prevRoomHistory,roomId])
      }
      if(!isNaN(event)) setCurrentRoom(event)
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
        chooseRoom,
        roomId,
        previousRoomId,
        currentRoom,
        goBack
      }),
      [roomId]
    );

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;

}

export default function useData() {
    return useContext(DataContext); 
}