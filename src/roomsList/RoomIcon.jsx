
export default function RoomIcon  (prop) {
  const room = prop.room
  const onClick = prop.onClick
  const lmessage = room?.lastPost ? room.lastPost.content:"no message"
  const unread = prop.room.unread

  return (
    <div className="room-icon " onClick={() => onClick(room.id)}>
      <div className='icon-container spaceBetween'>
          <div  className="room-icon-name">{room.name}</div>
          <div className="room-icon-unread">{unread}</div>
          <div  className="room-icon-message">{lmessage}</div>
      </div>
      
    </div>
  );
};