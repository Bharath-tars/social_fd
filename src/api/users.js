import client from './client'

export const getProfile      = (username) => client.get(`/users/${username}`)
export const getUserPosts    = (username) => client.get(`/users/${username}/posts`)
export const followUser      = (username) => client.post(`/users/${username}/follow`)
export const listUsers       = ()         => client.get('/users')
export const getNotifications = ()        => client.get('/notifications')
export const markNotificationsRead = ()   => client.patch('/notifications/read')
export const getUnreadCount  = ()         => client.get('/notifications/unread-count')
