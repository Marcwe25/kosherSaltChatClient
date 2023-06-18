import { useState, useEffect, useCallback, useReducer } from 'react';
import { useApi } from './useApi';
import useAuth from './auth-context';
import { all_notifications_url, posts_for_notification_url } from "../utility/constsURL";

function useNotificationList() {
    console.log("useNotificationList")
  const {axiosInstance} = useApi()
  const [notificationListLoaded, setNotificationListLoaded] = useState(false)
  const {registeredMember} = useAuth()

  function fetchNotificationList() {
    setNotificationListLoaded(false)
    axiosInstance.get(all_notifications_url)
      .then(response => {
        let notificationlist = response.data
          dispatch(
            {type:"FETCH_SUCCESS", payload: notificationlist})
      })
      .catch(error => {
          dispatch(
            {type:"FETCH_ERROR"})
      })
  }

  useEffect(() => {
    if (registeredMember && !notificationListLoaded) fetchNotificationList()
  }, [registeredMember,notificationListLoaded]);


  function reducer (state, action) {
    switch (action.type) {

      case 'FETCH_SUCCESS' :{
        console.log("notificationlist fetched successfuly",action.payload)
        setNotificationListLoaded(true)
        return {
          ...action.payload
        }
      }

      case 'UPDATE_UNREAD' :{
        return {
          ...state,
          notifications: state.notifications.map((notification)=>{
            if(notification.id===action.notificationid){
              notification.unread = action.unread
            }
            return notification
          })
        }
      }

      case 'INCREMENT_UNREAD' :{
        console.log("incrementingggg ROOM : ", action.notificationid)
        return {
          ...state,
          notifications: state.notifications.map((notification)=>{
            if(notification.id===action.notificationid){
              notification.unread = notification.unread+1
            }
            return notification
          })
        }
      }

      case 'RESET_UNREAD' :{
        console.log("RESETING ROOM : ", action.notificationid)
        return {
          ...state,
          notifications: state.notifications.map((notification)=>{
            if(notification.id===action.notificationid){
              notification.unread = 0
            }
            return notification
          })
        }
      }

      case 'UPDATE_LASTPOST' :{
        console.log("inside dispatcher: " ,action.notificationid,action.lastPost )
        return {
          ...state,
          notifications: state.notifications.map((notification)=>{
            if(notification.id===action.notificationid){
              notification.lastPost = action.lastPost
              notification.unread = notification.unread+1
              console.log("UPDATE_LASTPOST did update ", notification)
            }
            return notification
          })
        }
      }

      case 'ADD_NOTIFICATION' :{
        console.log("updateeeeee",state)
        console.log("updateeeeee",action.notification)

        const type = action.notification.type
        return {
          ...state,notifications:{...state.notifications, [type]:[...state.notifications[type],action.notification]}
        }
      }
    }
  }

  const [notificationList, dispatch] = useReducer(reducer,null)


  function reset (notificationid) {
    if(notificationList){
    dispatch(
      {type:"RESET_UNREAD", notificationid: notificationid})
    }
  }



  function addNotification (notification)  {
    dispatch({type:"ADD_NOTIFICATION", notification: notification})}


  return {notificationList,addNotification, fetchNotificationList, notificationListLoaded}
}

export default useNotificationList;
