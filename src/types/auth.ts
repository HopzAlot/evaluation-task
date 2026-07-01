export type Role = 'User' | 'Admin'

export type AppUser = {
  uid: string
  name: string
  email: string
  role: Role
}

export type RegisterValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: Role
}

export type LoginValues = {
  email: string
  password: string
}
