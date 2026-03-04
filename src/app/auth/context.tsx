'use client'
import { setCookie, getCookie } from '@/utils/cookie';
import { api } from '@/utils/request';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner';

const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthContextProvider: React.FC<AuthContextProvider> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>("");

  const handleLogin = useCallback(async ({
    email,
    password
  }: UserLogin) => {
    try{
      const { data: responseData } = await api.post('/api/auth/login', {
        email,
        password
      })
  
      toast("Success!", {
        description: "You will be redirected...",
      });
  
      setUser(responseData.data.user);
      router.refresh();
      return true;
    } catch (err) {
      console.log("[!] Login", err);
      toast("Oops!", {
        description: "Something went wrong, try again.",
      });
      return false;
    }
  }, [router])

  const handleRegister = useCallback(async (user: UserRegister) => {
    try {
      await api.post('/api/auth/register', user)
      toast("Success!", {
        description: "You have been registered and will be redirected...",
      });
      return true
    } catch (error) {
      console.log("[!] Register", error)
      toast("Oops!", {
        description: "Something went wrong, try again.",
      });
      return false;
    }
  }, [])

  const loadUser = useCallback(async () => {
    try {
      const { data: responseData } = await api.get('/api/auth/user')
      if (responseData) {
        setUser(responseData.data);
      }
    } catch (error) {
      console.log("[!] Load User", error)
    }
  }, [])

  useEffect(() => {
    loadUser();
  }, [])

  const handleLogout = useCallback(async () => {
    setUser({} as User);
    setToken("");
    setCookie('@dnnr:authToken', '')
    // Also call a logout API if needed to clear HTTP-only cookie
    try {
      await api.post('/api/auth/logout');
    } catch (e) { }
    router.refresh();
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogin,
        handleRegister,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside a AuthContext')
  }

  return context
}
