export interface ResgisterRequestType {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
}

