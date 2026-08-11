import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getMe, signOut as apiSignOut } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('careerai_token')
        if (token) {
          const { user } = await getMe()
          setUser(user)
        }
      } catch (error) {
        setUser(null)
        localStorage.removeItem('careerai_token')
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const signIn = (nextUser, token) => {
    setUser(nextUser)
    localStorage.setItem('careerai_token', token)
  }

  const signOut = async () => {
    try {
      await apiSignOut()
    } catch (e) {
      // Ignore errors on signout
    } finally {
      setUser(null)
      localStorage.removeItem('careerai_token')
    }
  }

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }

  const value = useMemo(() => ({ user, loading, signIn, signOut, updateUser, isAuthenticated: Boolean(user) }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}