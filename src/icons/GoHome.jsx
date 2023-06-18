import './icons.css';
import useData from '../hooks/data-context';
import GoHomeIcon from './GoHomeIcon';

export default function GoHome () {


    const {chooseRoom} = useData()

    const goHome = () => {
        chooseRoom(0);
      }

    return  (          
        <span className="buttonCompo" onClick={goHome}>
            <GoHomeIcon />
        <span className="buttonTxt">HOME</span>
        </span>
    )
}


