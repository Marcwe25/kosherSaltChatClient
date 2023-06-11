import useAuthentication from '../hooks/useAuthentication';
import GoBack from '../icons/GoBack';
import GoHome from '../icons/GoHome';

export default function ProfileMenu (props) {

    const handleRoomClick = props.handleRoomClick

    return (       
    <div className='listHeader border1 back_image'>
        <div className='headerItem'>PROFILE</div>
        <div className='listMenu'>
            <GoBack/>
        </div>
    </div>
    )
}