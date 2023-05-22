import React, { useState, useEffect } from 'react';
// import useRegisteredMember from '../hooks/useRegisteredMember';
import '../css/icon.css';
import useContactBook from '../hooks/useContactBook';

export default function RoomIcon  (prop) {
  // const {registeredMember } = useRegisteredMember()
  const room = prop.room
  const members = prop.members
  const onClick = prop.onClick

  const [numUnread, setNumUnread] = useState(room.unread);

  const getNames = (obj) => {
    let result = ""
    Object.keys(obj).forEach((i) => {
      const name = obj[i].username.split('@')[0]
      result += `${name},`;
    });

    result = result.slice(0, -1); 
    return result

  }
  console.log("members",members)

  console.log("getNames",getNames(members))

  const names = getNames(members)



  return (
    <div className="room-icon" onClick={() => onClick(room.id)}>

      <div className='icon-container'>

          <div  className="room-icon-name">{names}</div>

          <div className="room-icon-unread">{numUnread}</div>
      </div>
      
    </div>
  );
};