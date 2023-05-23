
import "./ChatClient.css"

const MessageIcon = ({post}) => {
    console.log(post.dateLocal)
    const dateLocal =  new Date(post.dateTime)
    const ti = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset()*60*1000);

    return (
    
    <div className="messageIcon">
        <div>{post.id}</div>
        <div className="messageTitle">
            {/* <div className="messageTime">{ti.getHours()}:{ti.getMinutes()}</div> */}
            <div className="messageTime">`{ti.toString()}`</div>

            <div className="messageFrom">{post.from.username}</div> 
        </div>

        <div className="messageContent"> {post.content}</div>

        </div>
    )
}

export default MessageIcon