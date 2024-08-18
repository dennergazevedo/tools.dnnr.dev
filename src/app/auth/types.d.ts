type AuthContextProvider = any;

interface UserLogin {
  email: string
  password: string
}

interface UserRegister{
  firstName: string
  lastName: string
  email: string
  password: string
}

interface User {
  firstName: string
  lastName: string
  email: string
  roles: string
}

interface AuthContext {
  token: string
  user: User
  handleLogin: (user: UserLogin) => Promise<boolean>
  handleRegister: (user: UserRegister) => Promise<boolean>
  handleLogout: () => void
}