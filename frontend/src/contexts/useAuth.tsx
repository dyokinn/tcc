import { createContext, useState } from "react"
import api from "../assets/api"
import { useNavigate } from "react-router-dom"

interface ICustomAuthContext {
    userId: number,
    username: string,
    getAccess: (username: string, password:string, withCreate: boolean) => any,
    logout: () => any
}

export const CustomAuthContext = createContext<ICustomAuthContext>({} as ICustomAuthContext)           

// Exporta funcionamento do contexto no componente de rotas
export function AuthContextProvider(props:any) {
    
    function getUserId(){
        const initialState = localStorage.getItem("userId")
        return Number(initialState)
    }
    
    function getUsername(){
        const initialState = localStorage.getItem("username")
        return String(initialState)
    }

    // Hook de estado para o contexto
    const [userId, setUserId] = useState(getUserId)
    const [username, setUsername] = useState(getUsername)
    const navigate = useNavigate()

    async function getAccess(username: string, password:string, withCreate:boolean = false) {
        try {
            let response = await api.post(
                "/users/" + (withCreate ? "register" : "login"),
                {
                    username,
                    password
                }
            )
            
            setUserId(response.data.user.id)
            setUsername(response.data.user.username)
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            navigate("/scopes")

        } catch (error: any) {
            window.alert(error.response.data.message)
            console.log(error);
        }
    }

    function logout() {
        localStorage.clear()
        setUserId(0)
        setUsername("")
    }

    return(
      <CustomAuthContext.Provider value = {{userId, username, getAccess, logout}}>
        {props.children}
      </CustomAuthContext.Provider>
    )
} 