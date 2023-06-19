import useData from '../hooks/data-context';
import './icons.css';


export default function Cancel (props) {

    const { goBack } = useData()
    
    const handleCancel = () => {
        if (typeof props.submitCancel === 'function') {
            props.submitCancel()
        }
        if(!props.isRedirect) goBack()
    }

    return (       
            <div className='cancelIcon menuButton' 
            onClick={handleCancel}/>
    )
}