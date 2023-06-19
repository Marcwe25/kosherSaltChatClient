import './icons.css';
import useData from '../hooks/data-context';

export default function GoHomeIcon (props) {


    const {chooseRoom} = useData()
    const cf = props.cf
    const goHome = () => {
        if( typeof cf === 'function') {
            cf()}
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