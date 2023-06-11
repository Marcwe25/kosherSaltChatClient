
export default function RoomIcon  (prop) {
  const room = prop.room
  // const members = prop.members
  const onClick = prop.onClick

  // const getNames = (obj) => {
  //   let result = ""
  //   Object.keys(obj).forEach((i) => {
  //     const name = obj[i].username.split('@')[0]
  //     result += `${name},`;
  //   });
  //   result = result.slice(0, -1); 
  //   return result
  // }

  // const names = getNames(members)
  const lmessage = room?.lastPost ? room.lastPost.content:"no message"
  const unread = prop.room.unread

  return (
    <div className="room-icon " onClick={() => onClick(room.id)}>

      <div className='icon-container'>
          <div  className="room-icon-name">{room.name}</div>
          <div className="room-icon-unread">{unread}</div>
          <div  className="room-icon-message">{lmessage}</div>
      </div>
      
    </div>
  );
};