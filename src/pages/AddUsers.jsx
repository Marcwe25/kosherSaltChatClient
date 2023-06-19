import { useState, } from 'react';
import { addUsersToRoom_url } from '../utility/constsURL';
import { useApi } from '../hooks/useApi';
import Confirm from '../icons/Confirm';
import Cancel from '../icons/Cancel';
import useData from '../hooks/data-context';


export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
                className='myCheckbox heigher'
            />
            <label className='heigher' htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
    )
}

const AddUsers = (prop) => {
    const {axiosInstance} = useApi()
    const {currentRoom} = useData()

    const roomList = prop.roomList
    const members = roomList.members


    const getInitialSelectedState = () => {
        const room = roomList?.rooms.find( room => room.id === currentRoom )
        const availableMembers =  Object.keys( roomList.members ).filter( k => !(k in room.membersDetails))
        const initialState = ( availableMembers.reduce(( accumulator, memberid ) => ({ ...accumulator,[memberid] : false }),{}))
        return initialState
    }

    const [selectedContact, setSelectedContact] = useState(getInitialSelectedState());

    const refreshRoomList=prop.refreshRoomList

    const submitConfirm = async () => {        
        await axiosInstance.put(addUsersToRoom_url+"/"+currentRoom, 
            Object.keys(selectedContact)
            .filter(uid => selectedContact[uid])
        )
        setTimeout(() => {
            refreshRoomList()
        }, 2000);
        refreshRoomList()
    };
    const updateCheckStatus = uid => {
        setSelectedContact(prevSelectedContact => {
            return {...prevSelectedContact, [uid]:!prevSelectedContact[uid]}} )
    }

    return (
        < >
            <div className='blockContainer'>
                <div className='listHeader border1 inverseFlexDirection '>
                    <span className='standart'>
                        <Cancel />
                        <Confirm submitConfirm={submitConfirm} nextPage={currentRoom}/>
                    </span>
                </div>

                <div className='roomsContainer back_image border1'>
                    <form className='appMenu'>
                        {Object.keys(selectedContact).map((uid) => (
                            <span key={uid} className='buttonCompo '>
                                <Checkbox
                                    isChecked={selectedContact[uid]}
                                    checkHandler={() => updateCheckStatus(uid)}
                                    label={members[uid].username}
                                    index={members[uid].id}

                                />
                            </span >

                        ))}
                    </form>
                </div>


            </div>

        </>
    );

};

export default AddUsers
