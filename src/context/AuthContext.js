import { getAuth } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { useFirebaseApp, useUser } from "reactfire";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // const auth = getAuth()
    // const firebase = useFirebaseApp()
    // const user = useUser()
    const [user, setuser] = useState(false)
    
    return (
        <AuthContext.Provider value={{user, setuser}}>
            {children}
        </AuthContext.Provider>
    )
}