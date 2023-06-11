import { createContext, useContext } from "react";
import { useState , useMemo} from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [roomHistory] = useState([0])
    const [roomId,setRoomId] = useState(0)

    const chooseRoom = (event) => {
      console.log("datacontext go ", event)
        roomHistory.push(roomId)
        console.log("datacontext go ", roomHistory)

        setRoomId(event)
    }

    const goBack = () => {
      console.log("datacontext history ", roomHistory)

      const prev = previousRoomId()
      console.log("datacontext go back to ", prev)

      setRoomId(prev)
    }

    const previousRoomId = () => {
        return roomHistory.length>0 ? roomHistory.pop() : 0 
    }

    const value = useMemo(
      () => ({
        chooseRoom,
        roomId,
        previousRoomId,
        goBack
      }),
      [roomId]
    );

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;

}

export default function useData() {
    return useContext(DataContext); 
}