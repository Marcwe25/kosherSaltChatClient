import useData from '../hooks/data-context';
import { PROFILE } from '../utility/constNames';
import './icons.css';



export default function GoToProfile (props) {

    const {chooseRoom} = useData()

    const handleClick = () => {
        chooseRoom(PROFILE)
      }

    return (       
            // <div className='profileIcon menuButton' onClick={chooseRoom}/>

            <span className="buttonCompo" onClick={handleClick}>
                <div className='profileIcon menuButton' />
                <span className="buttonTxt">PROFILE</span>
                </span>

    )

}