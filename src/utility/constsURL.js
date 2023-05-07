export const wsUrl = 'wss://socketsbay.com/wss/v2/1/demo/'
export const apiURL = 'http://192.168.56.1:8080/api/v1'
export const client_url = 'http://localhost:3000'
export const login_page_url = '/login'

export const authURL = apiURL+'/auth'
export const loginURL = authURL+'/authenticate'
export const refresh_token_url = authURL+'/refresh-token'

export const chatRoom_url = apiURL + "/chatroom"
//export const chatRooms_url = chatRoom_url+"/chatRooms"

export const member_url = apiURL+"/chatmember"
export const all_chatrooms_url = member_url+"/chatrooms"


export const disable_chatrooms_url = chatRoom_url+"/true"
export const delete_chatrooms_url = chatRoom_url



