import GoBack from "../icons/GoBack";
import AddUser from "../icons/AddUser";
import GoToProfile from "../icons/GoToProfile";
import Logout from "../icons/Logout";
import GoHome from "../icons/GoHome";

export default function AppMenu (props) {


    return (
        <div className='appMenu back_image'>
            <GoHome />
            <AddUser/>
            <GoToProfile />
            <Logout/>
        </div>
    )
}