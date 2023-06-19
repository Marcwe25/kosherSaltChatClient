import NotificationIcon from "../icons/NotificationIcon";

export default function NotificationsMenu (props) {

    const notificationList = props.notificationList

        return (
            <div className='notificationMenu'>
           
            {notificationList && 
                Object.keys(notificationList.notifications)
                        .map(type=> <NotificationIcon key={type}
                                        notifications={notificationList.notifications[type]}
                                        ntype={type}
                                    />)
            }
            </div>
        )


}