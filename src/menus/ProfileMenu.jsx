import useAuthentication from '../hooks/useAuthentication';
import GoBack from '../icons/GoBack';
import GoHome from '../icons/GoHome';

export default function ProfileMenu (props) {

    const handleRoomClick = props.handleRoomClick

    return (       
    <div className='listHeader border1 '>
            <div className='headerItem headerTitle'>K</div> 
            <GoBack/>
    </div>
    )
}