



const useContactBook = (roomList, setRoomList,contactsBook) => {

    const getContact = (contactId) => {
        return contactsBook.find(c => c.id===contactId)
    }

    const setContactInRoomList = () => {}

    return {getContact}
}

export default useContactBook