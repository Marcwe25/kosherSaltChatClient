import useData from '../hooks/data-context';
import { APP_MENU } from '../utility/constNames';
import './icons.css';


export default function MenuButton () {

    const {chooseRoom} = useData()

    const goToAppMenu = () => {
        chooseRoom(APP_MENU)
    }

    return (       
            <div 
            className='menuIcon menuButton' 
            onClick={goToAppMenu}
            />
    )
}