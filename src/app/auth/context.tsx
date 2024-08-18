'use client'
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
      setToken(responseData.data.token);
  
      sessionStorage.setItem("@dnnr:authToken", responseData.data.token);
      return true;
    }catch(err){
      console.log("[!] Login", err);
      toast("Oops!", {
        description: "Something went wrong, try again.",
      });
      return false;
    }
  }, [])

  const handleRegister = useCallback(async (user: UserRegister) => {
    try{
      await api.post('/api/auth/register', user)
      toast("Success!", {
        description: "You have been registered and will be redirected...",
      });
      return true
    }catch(error){
      console.log("[!] Register", error)
      toast("Oops!", {
        description: "Something went wrong, try again.",
      });
      return false;
    }
  }, [])

  const loadUser = useCallback(async() => {
    try{
      const token = sessionStorage.getItem("@dnnr:authToken");
      if(!token) return;

      const { data: responseData } = await api.get(`/api/auth/user?token=${token}`)
      if(responseData){
        setUser(responseData.data);
        setToken(token);
      }
    }catch(error){
      console.log("[!] Load User", error)
      sessionStorage.setItem("@dnnr:authToken", '');
    }
  }, [])

  useEffect(() => {
    loadUser();
  }, [])

  const handleLogout = useCallback(() => {
    setUser({} as User);
    setToken("");
    sessionStorage.setItem("@dnnr:authToken", '');
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
