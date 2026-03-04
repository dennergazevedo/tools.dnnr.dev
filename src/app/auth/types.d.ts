type AuthContextProvider = any;

interface UserLogin {
  email: string
  password: string
}

interface UserRegister{
  firstname: string
  lastname: string
  email: string
  password: string
}

interface User {
  firstname: string
  lastname: string
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