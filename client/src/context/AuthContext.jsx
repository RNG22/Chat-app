import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";
import { BaseUrl, PostRequest } from "../utils/services";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
        setUser(JSON.parse(user));
    }
}, []);

const updateRegisterInfo = useCallback((info) => {
   setRegisterInfo(info)
}, []);
const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
}, []);
const registerUser=useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null);
   const response = await PostRequest(`${BaseUrl}/users/register`, JSON.stringify(registerInfo));
    if (response.error) {
        setRegisterError(response);
        return;
    }
    setIsRegisterLoading(false);
    localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
       
    
}, [registerInfo]);
const loginUser=useCallback(async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);
    const response = await PostRequest(`${BaseUrl}/users/login`, JSON.stringify(loginInfo));
    if (response.error) {
        setLoginError(response);
        return;
    }
    setIsLoginLoading(false);
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
}, [loginInfo]);
const logoutUser=useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
      // ✅ Clear all auth states
    setLoginError(null);
    setRegisterError(null);
    setLoginInfo({
        email: "",
        password: ""
    });
    
}, []);
console.log(registerInfo);
    return (
        <AuthContext.Provider value={{ user,registerInfo, setRegisterInfo, updateRegisterInfo,registerError, isRegisterLoading, registerUser ,logoutUser, loginInfo, setLoginInfo, updateLoginInfo, loginError, isLoginLoading, loginUser}}>
            {children}
        </AuthContext.Provider>
    );
};