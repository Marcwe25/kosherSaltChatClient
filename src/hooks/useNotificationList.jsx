import { useState, useEffect, useReducer } from 'react';
import { useApi } from './useApi';
import useAuth from './auth-context';
import { all_notifications_url } from "../utility/constsURL";

function useNotificationList() {
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
      .catch(() => {
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
        return {
          ...state,
          notifications: state.notifications.map((notification)=>{
            if(notification.id===action.notificationid){
              notification.lastPost = action.lastPost
              notification.unread = notification.unread+1
            }
            return notification
          })
        }
      }

      case 'ADD_NOTIFICATION' :{
        const type = action.notification.type
        return {
          ...state,notifications:{
            ...state.notifications, [type]: !state.notifications.hasOwnProperty(type) ?[action.notification]:[...state.notifications[type],action.notification]}
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
