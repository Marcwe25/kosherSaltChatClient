import { useState, } from 'react';
import { addUsersToRoom_url, room_url } from '../utility/constsURL';
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

    const getInitialSelectedState = () => {
        const contacts = {}
        Object.keys(prop.membersNotInRoom).forEach(id => {
            contacts[id] = false
        });
        return contacts
    }

    const {currentRoom} = useData()

    const { goBack } = useData()
    const { axiosInstance } = useApi()
    const members = prop.members
    const [selectedContact, setSelectedContact] = useState(getInitialSelectedState());
    const {chooseRoom} = useData()
    const refreshRoomList=prop.refreshRoomList
    const initSelectedContacts = () => {
        setSelectedContact(getInitialSelectedState())
    }

    const submitConfirm = async (e) => {
        e.preventDefault();
        const membersToAdd = Object.keys(selectedContact).filter(uid => selectedContact[uid])
        console.log("members sent", membersToAdd)
        await axiosInstance.put(addUsersToRoom_url+"/"+currentRoom, membersToAdd)
        initSelectedContacts()
        refreshRoomList()
        chooseRoom(currentRoom)
    };

    const submitCancel = () => {
        goBack()
    }

    const updateCheckStatus = uid => {
        setSelectedContact(prevSelectedContact => {
            return {...prevSelectedContact, [uid]:!prevSelectedContact[uid]}} )
    }

    return (
        <div >
            <div className='blockContainer'>
                <div className='listHeader border1 inverseFlexDirection '>
                    <span className='standart'>
                        <Cancel submitCancel={submitCancel} />
                        <Confirm submitConfirm={submitConfirm} />
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

        </div>
    );

};

export default AddUsers

// const updateCheckStatus = username => {
//     setSelectedContact(
//         members.map((member) =>
//             member.username === username
//                 ? { ...member, checked: !member.checked }
//                 : member
//         )
//     )
//     console.log("selected contacts ",selectedContact)
// }

{/* <form className='roomsContainer border1 back_image'>
                <label>
                    Pick contacts:
                    <select
                        multiple={true}
                        value={selectedContact}
                        onChange={handleChange}
                    >
                        {Object.values(prop.members).map((option) => (
                            <option key={option.username} value={option.username}>{option.username}</option> 
                            )
                            )}

                    </select>
                    </label>
                    <hr />
                    <p>Your favorite vegetables: {selectedContact.join(', ')}</p>

 
                </form> */}