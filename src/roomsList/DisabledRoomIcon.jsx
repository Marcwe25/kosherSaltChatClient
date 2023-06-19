import Cancel from "../icons/Cancel";
import Confirm from "../icons/Confirm";
import { useApi } from '../hooks/useApi'
import { linkToRoom_url, unlinkFromRoom_url } from '../utility/constsURL'

export default function DisabledRoomIcon  (prop) {
    const notification = prop.notification
    const {axiosInstance} = useApi()
    const fetchNotificationList = () => {prop.fetchNotificationList()}


    const submitCancel = async () => {
      await axiosInstance.put(unlinkFromRoom_url+"/" +notification.id)
      fetchNotificationList()
      }

    const submitConfirm = async() => {
      await axiosInstance.put(linkToRoom_url+"/" +notification.id)
      fetchNotificationList()
      }

    return (
      <div className="room-icon ">
        <div className='disable-room justifyContentRight icon-container icon10'>
            <div
              className="room-icon-message">{prop.notification.message}</div>
            <Cancel
              submitCancel={submitCancel}
              isRedirect={true}
              />
            <Confirm
              submitConfirm={submitConfirm}
              />
        </div>
      </div>
    );
  };
