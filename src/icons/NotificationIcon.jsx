import { NOTIFICATION_LIST } from "../utility/constNames"
import useData from '../hooks/data-context';

export default function NotificationIcon (props) {
    const {chooseRoom} = useData()

    const n = props.notifications.length

    const handleClick = () => {
        chooseRoom(NOTIFICATION_LIST+"_"+props.ntype)
      }

    const cssClass = `menuButton ${props.ntype}`

    return (
        <span className="notificationCompo" onClick={handleClick}>
            <div className={cssClass} />
            <span className="notificationTxt">{n}</span>
        </span>
    )
}

