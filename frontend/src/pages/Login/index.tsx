import { useContext, useEffect, useState } from "react"
import CustomButton from "../../components/Common/CustomButton"
import CustomTextInput from "../../components/Common/CustomTextInput"
import CustomDrawer from "../../components/CustomDrawer"
import {CustomAuthContext} from "../../contexts/useAuth"
import "./index.scss"

const Login = () => {

    const {getAccess, logout} = useContext(CustomAuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        logout()
    }, [])

    return (
        <CustomDrawer>
            <div id="login-page">
                <h1>Login</h1>
                <div id="inputs">
                    <CustomTextInput disabled={false} label={"user"} value={username} onChange={(e: any) => setUsername(e.target.value)}/>
                    <CustomTextInput disabled={false} label={"password"} value={password} onChange={(e: any) => setPassword(e.target.value)}/>
                </div>
                <div id="actions">
                    <CustomButton disabled={false} variant="contained" onClick={e => getAccess(username, password, false)}>Login</CustomButton>
                    <CustomButton disabled={false} variant="contained" onClick={e => getAccess(username, password, true)}>Signup</CustomButton>
                </div>
            </div>
        </CustomDrawer>
    )
}

export default Login