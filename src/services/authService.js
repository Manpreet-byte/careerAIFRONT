import api from './api'

export async function signIn(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data.data
}

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload)
  return data.data
}

export async function signOut() {
  const { data } = await api.post('/auth/logout')
  return data
}

export async function getMe() {
  const { data } = await api.get('/auth/me')
  return data.data
}

export async function updateProfile(payload) {
  const { data } = await api.patch('/users/profile', payload)
  return data.data
}

export async function googleSignIn(idToken) {
  const { data } = await api.post('/auth/google', { idToken })
  return data.data
}