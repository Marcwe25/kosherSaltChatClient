import useData from '../hooks/data-context';
import './icons.css';


export default function GoBack (props) {

    const {goBack} = useData()

    return  (          
        <span className="buttonCompo" onClick={goBack}>
        <div className='backIcon menuButton' />
          <span className="buttonTxt">BACK</span>
        </span>
        )
}