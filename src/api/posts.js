import client from './client'

export const createPost   = (data)   => client.post('/posts', data)
export const getPost      = (id)     => client.get(`/posts/${id}`)
export const deletePost   = (id)     => client.delete(`/posts/${id}`)
export const toggleLike   = (id)     => client.post(`/posts/${id}/like`)
export const getComments  = (id)     => client.get(`/posts/${id}/comments`)
export const addComment   = (id, data) => client.post(`/posts/${id}/comments`, data)
