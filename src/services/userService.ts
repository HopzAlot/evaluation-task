import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { AppUser, Role } from '../types/auth'

type SaveUserInput = {
  uid: string
  name: string
  email: string
  role: Role
}

export async function saveUserProfile(user: SaveUserInput) {
  if (!db) {
    throw new Error('Firebase is not configured.')
  }

  await setDoc(doc(db, 'users', user.uid), user)
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  if (!db) {
    throw new Error('Firebase is not configured.')
  }

  const snapshot = await getDoc(doc(db, 'users', uid))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as AppUser
}
