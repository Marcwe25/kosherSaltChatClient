export const server_url = 'https://api.wewehappy.com/kchatbe'
export const apiURL = server_url + '/api/v1'
export const login_page_url = '/login'

export const ws_url = server_url + "/chat-room-websocket"

export const authURL = apiURL+'/auth'
export const loginURL = authURL+'/authenticate'
export const registerURL = authURL+'/register'

export const refresh_token_url = authURL+'/refresh-token'

export const room_url = apiURL + "/room"
export const lastseen = room_url+'/lastSeen'
export const posts_for_room_url = room_url + "/posts"
export const member_url = apiURL+"/member"
export const unlinkFromRoom_url = member_url+"/unlink"
export const linkToRoom_url = member_url+"/link"
export const all_rooms_url = member_url+"/rooms"
export const addUserToRoom_url = room_url + "/addUserToRoom"
export const addUsersToRoom_url = room_url + "/addUsersToRoom"
export const all_notifications_url = member_url + "/notifications"
export const disable_rooms_url = room_url+"/true"
export const delete_rooms_url = room_url


export const transition_time_a = 3000



