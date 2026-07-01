import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { AuthContext } from './authContextValue'
import { getUserProfile, saveUserProfile } from '../services/userService'
import type { AppUser, RegisterValues, LoginValues } from '../types/auth'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(Boolean(auth))

  useEffect(() => {
    if (!auth) {
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const profile = await getUserProfile(firebaseUser.uid)
      setUser(
        profile ?? {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName ?? 'User',
          email: firebaseUser.email ?? '',
          role: 'User',
        },
      )
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function register(values: RegisterValues) {
    if (!auth) {
      throw new Error('Firebase is not configured. Add VITE Firebase values in .env.')
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    )

    await updateProfile(credential.user, { displayName: values.name })
    await saveUserProfile({
      uid: credential.user.uid,
      name: values.name,
      email: values.email,
      role: values.role,
    })
  }

  async function login(values: LoginValues) {
    if (!auth) {
      throw new Error('Firebase is not configured. Add VITE Firebase values in .env.')
    }

    const credential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    )
    const profile = await getUserProfile(credential.user.uid)

    if (!profile) {
      throw new Error('User role profile was not found.')
    }

    setUser(profile)
  }

  async function logout() {
    if (!auth) {
      setUser(null)
      return
    }

    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
