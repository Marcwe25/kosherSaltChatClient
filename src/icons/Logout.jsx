import useAuthentication from "../hooks/useAuthentication"



export default function Logout () {

    const {logout} = useAuthentication()

    function handleLogout () {
        logout()
    }

    return (
        <div className='logoutButton menuButton' onClick={handleLogout}/>
    )
}