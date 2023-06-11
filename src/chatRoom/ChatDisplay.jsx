import MessageIcon from "./MessageIcon";

const ChatDisplay = (props) => {

  const chatMessages = props.chatMessages

    return (
      <div className="messageContainer border1 back_image scrolable">
          <div >
            {chatMessages
                  .sort((a,b)=>{return a.dateTime - b.dateTime})
                  .map((post) => (
                    <MessageIcon key={post.id} post={post} />
                  ))
            }
          </div>
          </div>
      );
}

export default ChatDisplay