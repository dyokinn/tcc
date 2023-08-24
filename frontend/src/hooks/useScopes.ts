import { Dispatch, SetStateAction, useState } from "react";
import IScope from "../assets/commonInterfaces/IScope";
import api from "../assets/api";

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
            console.log("foi");
            
        } catch (error) {
            console.log("erro")
        }
        
    }

    const sendScope = async ( type:string, setIsOpen: Dispatch<React.SetStateAction<boolean>>, scopeId?: number) => {
        try {
            const response = type === "create"
            ? await api.post("/scopes/",
                {
                    name,
                    description,
                    "user_id": props.userId
                }
            )
            : await api.put("/scopes/" + scopeId,
                {
                    name,
                    description,
                }
            )
            if(type == "create") {
                setScopes([...scopes, response.data])
            } else {
                console.log(scopeId);
                
                let mirroredScopes = scopes
                let index = mirroredScopes.findIndex(scope => scope.id == response.data["id"])
                console.log(index);
                
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
                const response = await api.delete("/scopes/" + scopeId)
                console.log("excluiu");
                setScopes(response.data)

            }
        } catch(e){
            window.alert("There was an error deleting this scope, please try again later!")
        }
    }

    return {name, setName, description, setDescription, scopes, getScopes, sendScope, deleteScope}

}

export default useScopes