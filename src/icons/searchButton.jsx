import './icons.css';

export default function SearchButton (props) {

    const togglePrompt = props.togglePrompt

    return (       
            <div className='searchIcon menuButton' onClick={togglePrompt}/>
    )
}