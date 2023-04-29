import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false)

    return (
        <AuthContext.Provider value={{logged, setLogged}}>
            {children}
        </AuthContext.Provider>
    )
}