import './icons.css';
import useData from '../hooks/data-context';

export default function GoHomeIcon () {


    const {chooseRoom} = useData()

    const goHome = () => {
        chooseRoom(0);
      }

    return  (          
    <div 
        onClick={goHome} 
        className=' menuButton HomeIcon'>
        </div>
    )
}

// listMenu