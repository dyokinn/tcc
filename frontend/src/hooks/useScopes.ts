import { Dispatch, SetStateAction, useState } from "react";
import IScope from "../assets/commonInterfaces/IScope";
import api from "../assets/api";
import IText from "../assets/commonInterfaces/IText";

interface IUseScopes {
    userId: number
}

const useScopes = (props: IUseScopes) => {
    const [scopes, setScopes] = useState<IScope[]>([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const getScopes = async () => {
        try {
            const response = await api.get("/scopes/")
            setScopes(response.data)
        } catch (error) {
            console.log("erro")
        }
        
    }

    const sendScope = async ( type:string, setIsOpen: Dispatch<React.SetStateAction<boolean>>, scope?: IScope) => {
        try {
            const response = type === "create"
            ? await api.post("/scopes/",
                {
                    name,
                    description,
                    "user_id": props.userId
                }
            )
            : await api.put("/scopes/" + scope_id,
                {
                    name,
                    description,
                }
            )
            if(type == "create") {
                setScopes([...scopes, response.data])
            } else {
                let mirroredScopes = scopes
                let index = mirroredScopes.findIndex(scope => scope.id == response.data["id"])
                mirroredScopes[index] = response.data
                setScopes(mirroredScopes)
            }
            setName("")
            setDescription("")
            setIsOpen(false)
        } catch (error) {
            console.log("erro")
        }
    }

    const deleteScope = async (scopeId:number) => {
        try {
            if (window.confirm("Are you sure to delete this scope?")){
                const result = await api.delete("/scopes/" + scopeId)
            }
        } catch(e){
            window.alert("There was an error deleting this scope, please try again later!")
        }
    }

    return {name, setName, description, setDescription, scopes, getScopes, sendScope, deleteScope}

}

export default useScopes