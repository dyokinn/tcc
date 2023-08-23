import { createContext, useState } from "react"
import api from "../assets/api"
import { useNavigate } from "react-router-dom"

interface ICustomAuthContext {
    userId: number,
    login: (username: string, password:string, withCreate: boolean) => any,
    logout: () => any
}

export const CustomAuthContext = createContext<ICustomAuthContext>({} as ICustomAuthContext)           

// Exporta funcionamento do contexto no componente de rotas
export function AuthContextProvider(props:any) {
    
    // Hook de estado para o contexto
    const [userId, setUserId] = useState(0)
    const navigate = useNavigate()

    async function login(username: string, password:string, withCreate:boolean = false) {
        try {
            let response = await api.post(
                "/users/" + (withCreate ? "register" : "login"),
                {
                    username,
                    password
                }
            )
            
            setUserId(response.data.userId)
            navigate("/scopes")
        } catch (error) {
            console.log(error);
        }
    }

    function logout() {
        setUserId(0)
    }

    return(
      <CustomAuthContext.Provider value = {{userId, login, logout}}>
        {props.children}
      </CustomAuthContext.Provider>
    )
} 