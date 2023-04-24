import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const localUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(localUser !== null ? localUser : {});
    const navigate = useNavigate();

    useEffect(() => {
        if (localUser === null){
            navigate("/");
        } else{
            navigate("/home");
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}