import "../css/ChatClient.css"
import useAuth from "../hooks/auth-context";

const MessageIcon = ({ post }) => {
    const dateLocal = new Date(post.dateTime)
    const { registeredMember } = useAuth()
    const ti = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000);

    const targetSide = () => {
        return registeredMember.id == post.from.id ?  'cancelRight' : 'alignRight'
    }

    return (

        <div className=
        {`room-icon ${targetSide()}`}
        >
            <div className="icon-container ">
                <div className="messageTitle">
                    {/* <div className="messageTime ">{ti.getHours()}:{ti.getMinutes()}</div> */}
                    <div className="messageTime ">`{ti.toUTCString()}`</div>
                    <div className="messageFrom">{post.from.username}</div>
                </div>

            </div>
            <div className="room-icon-message icon-container ">
                <div className="contents">
                {post.content}

                </div>
            </div>

        </div>
    )
}

export default MessageIcon


