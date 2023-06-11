import './icons.css';
import useData from '../hooks/data-context';

export default function GoHome (props) {


    const {chooseRoom} = useData()

    const goHome = () => {
        chooseRoom(0);
      }

    return  (          
    <div 
        onClick={goHome} 
        className='listMenu menuButton backIcon'>
        </div>
    )
}