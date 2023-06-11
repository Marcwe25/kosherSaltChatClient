import useAuthentication from "../hooks/useAuthentication"
import './icons.css';



export default function Logout () {

    const {logoutUser} = useAuthentication()

    function handleLogout () {
        logoutUser()
    }

    return (
        // <div className='logoutIcon menuButton' onClick={handleLogout}/>
        <span className="buttonCompo" onClick={handleLogout}>
        <div className='logoutIcon menuButton' />
        <span className="buttonTxt">SIGN OUT</span>
        </span>

    )
}