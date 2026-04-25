import { create } from 'zustand'

const STORAGE_KEY = 'opengem-auth'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { user: null, token: null }
  } catch {
    return { user: null, token: null }
  }
}

const useAuthStore = create((set) => ({
  ...loadFromStorage(),
  isAuthenticated: !!loadFromStorage().token,

  setAuth: (user, token) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
    set({ user, token, isAuthenticated: true })
  },

  updateUser: (user) => {
    const raw = loadFromStorage()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...raw, user }))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ user: null, token: null, isAuthenticated: false })
  },
}))

export default useAuthStore
