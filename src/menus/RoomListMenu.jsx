import SearchButton from '../icons/searchButton';
import MenuButton from '../icons/MenuButton';
import NotificationsMenu from './NotificationsMenu';
import { useState } from 'react';
import Cancel from '../icons/Cancel';

export default function RoomListMenu (props) {
    const notificationList=props.notificationList
    const [isPrompt,setIsPrompt] = useState(false)
    const searchInput = props.searchInput
    const setSearchInput = props.setSearchInput

    const togglePrompt = () => {
        setIsPrompt(prevIsPrompt => !prevIsPrompt)
    }

    const submitCancel = () => {
        togglePrompt()
        setSearchInput("")
    }

    const handleChange = (event) => {
		const value = event.target.value;
		setSearchInput(value)
	  }


    const menuComponent = <>
                            <div className='headerItem headerTitle'>K</div> 
                                <span>
                                    <NotificationsMenu notificationList={notificationList}/>
                                    <SearchButton togglePrompt={togglePrompt}/>
                                    <MenuButton/>
                                </span>
                            </>

    const prompt = <>
                    <div className='headerItem headerTitle'>
                    <input
						className='searchInput'
						type="text"  
						name="inputValue" 
						placeholder='username'  
						value={searchInput} 
						onChange={handleChange}
						/>
                        
                        </div> 
                    <span>
                        <Cancel submitCancel={submitCancel}/>
                    </span>
                    </>


    return (
        <div className='flexHeader border1  '>
            {!isPrompt && menuComponent || prompt}
        </div>
    )
}

