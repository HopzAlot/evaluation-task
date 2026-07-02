import { createContext } from 'react'
import type { AppUser, LoginValues, RegisterValues } from '../types/auth'

export type AuthContextValue = {
  user: AppUser | null
  loading: boolean
  registering: boolean
  register: (values: RegisterValues) => Promise<void>
  login: (values: LoginValues) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
