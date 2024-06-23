import { createContext,useCallback,useEffect,useState } from "react";
import { baseUrl, postRequest } from "../src/utils/services";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children } ) => {

  const [user,setUser]=useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo]=useState({
    name:"",
    phoneNumber:"",
    email:"",
    password:""
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo]=useState({
    email:"",
    password:""
  });

  // console.log("User", user);
  // console.log("Login info", loginInfo);
  useEffect(()=>{
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user))
  },[])

  const updateRegisterInfo = useCallback((info)=>{
    setRegisterInfo(info)
  },[])
  const updateLoginInfo = useCallback((info)=>{
    setLoginInfo(info)
  },[])

  const registerUser = useCallback (async(e)=>{
    e.preventDefault();

    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(`${baseUrl}/users/signup`,registerInfo);

    setIsRegisterLoading(false);

    if (response.error){
      // console.log(response)
      return setRegisterError(response);
    }
    localStorage.setItem("User",JSON.stringify(response))
    setUser(response);
  },[registerInfo])
  
  const loginUser = useCallback(async(e)=>{
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(`${baseUrl}/users/login`,loginInfo);
    setIsLoginLoading(false);

    if (response.error){
      return setLoginError(response);
    }
    localStorage.setItem("User",JSON.stringify(response))
    setUser(response);

  },[loginInfo])

  const logoutUser = useCallback(()=>{
    localStorage.removeItem("User");
    setUser(null);
  },[])

  return (
    <AuthContext.Provider 
    value={{user, registerInfo, updateRegisterInfo, registerUser, registerError,
      isRegisterLoading,logoutUser, updateLoginInfo, loginUser, loginInfo, loginError,isLoginLoading
    }}>
      {children}
    </AuthContext.Provider>
    )
    
}