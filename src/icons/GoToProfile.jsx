


export default function GoToProfile (props) {

    

    const handleRoomClick = props.handleRoomClick

    function openProfile () {
        handleRoomClick("profile")
    }

    return (       
            <div className='profileButton menuButton' onClick={openProfile}/>
    )

}