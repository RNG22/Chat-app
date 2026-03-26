import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
const updateRegisterInfo = useCallback((info) => {
   setRegisterInfo(info)
}, []);
console.log(registerInfo);
    return (
        <AuthContext.Provider value={{ user,registerInfo, setRegisterInfo, updateRegisterInfo }}>
            {children}
        </AuthContext.Provider>
    );
};