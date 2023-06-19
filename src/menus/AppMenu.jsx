import AddUser from "../icons/AddUser";
import GoToProfile from "../icons/GoToProfile";
import Logout from "../icons/Logout";
import GoHomeIcon from "../icons/GoHomeIcon";

export default function AppMenu () {

    return (
        <div className='blockContainer '> 
        <div className='listHeader border1  '>
            <div className='headerItem headerTitle'>K</div> 
            <span>
                <GoHomeIcon/>
            </span>
        </div>
            <div className="appMenu back_image">
            <AddUser/>
            <GoToProfile />
            <Logout/>
            </div>
 
  </div>

    )
}

