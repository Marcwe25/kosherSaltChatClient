import useData from '../hooks/data-context';
import './icons.css';

export default function Confirm (props) {

    const {chooseRoom} = useData()

    const handleConfirm = (e) => {
        typeof (props.submitConfirm) === 'function' && props.submitConfirm(e)
        props.nextPage && chooseRoom(props.nextPage)
    }

    return (       
            <div className='confirmIcon menuButton' onClick={handleConfirm}/>
    )
}