import client from './client'

export const getExploreFeed  = (skip = 0) => client.get(`/feed/explore?skip=${skip}&limit=20`)
export const getHomeFeed     = (skip = 0) => client.get(`/feed/home?skip=${skip}&limit=20`)
export const getTrendingFeed = (skip = 0) => client.get(`/feed/trending?skip=${skip}&limit=20`)
