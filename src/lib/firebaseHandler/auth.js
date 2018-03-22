import fbHandler from './index.js'

export const login = (email, password) => {
  if (!email || !password) return Promise.reject(new Error('Email and password required'))
  return fbHandler.signInWithEmailAndPassword(email, password)
}
export const logout = () => {
  return fbHandler.signOut()
}