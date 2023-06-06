



export default function GoHome (props) {

    const handleRoomClick = props.handleRoomClick


    const goHome = () => {
        handleRoomClick(0);
      }

    return  (          
    <div 
        onClick={goHome} 
        className='listMenu menuButton backButton'>

        </div>
    )
}