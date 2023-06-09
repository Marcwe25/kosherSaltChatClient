export const wsUrl = 'wss://socketsbay.com/wss/v2/1/demo/'
export const apiURL = 'http://192.168.56.1:8080/api/v1'
export const client_url = 'http://localhost:3000'
export const login_page_url = '/login'

export const authURL = apiURL+'/auth'
export const loginURL = authURL+'/authenticate'
export const refresh_token_url = authURL+'/refresh-token'

export const room_url = apiURL + "/room"
//export const rooms_url = room_url+"/rooms"

export const member_url = apiURL+"/member"
export const all_rooms_url = member_url+"/rooms"


export const disable_rooms_url = room_url+"/true"
export const delete_rooms_url = room_url



