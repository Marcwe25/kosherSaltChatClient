
import "./ChatClient.css"

const MessageIcon = ({post}) => {
    const dateLocal =  new Date(post.dateTime)
    const ti = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset()*60*1000);
    return (
    
    <div className="room-icon">
        <div className="icon-container ">
            <div className="messageTitle">
                {/* <div className="messageTime ">{ti.getHours()}:{ti.getMinutes()}</div> */}
                <div className="messageTime ">`{ti.toUTCString()}`</div>
                <div className="messageFrom">{post.from.username}</div> 
            </div>
        
            </div>
        <div className="room-icon-message icon-container ">
             {post.content}</div>
        
        </div>
    )
}

export default MessageIcon