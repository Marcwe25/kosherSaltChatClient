import AddUser from '../icons/AddUser';
import GoToProfile from '../icons/GoToProfile';
import InputForm from '../icons/InputForm';
import Logout from '../icons/Logout';
import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { room_url, transition_time_a } from "../utility/constsURL"
import SearchButton from '../icons/searchButton';
import MenuButton from '../icons/MenuButton';

export default function RoomListMenu () {


    return (
        <div className='listHeader border1 back_image'>
        <SearchButton/>
        <div className='headerItem headerTitle'>KOSHER CHA CHA </div> 
        <MenuButton/>
    </div>
    )
}