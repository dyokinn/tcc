import { useState } from "react"
import IScope from "../assets/commonInterfaces/IScope"

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState("")
    const [scopeId, setScopeId] = useState(0)

    const popModal = async (value: boolean, type: "create" | "update", scopeId?:number) => {
        setIsOpen(value)
        setType(type)
        if (scopeId != null){
            setScopeId(scopeId)
        }
    }


    return{ isOpen, setIsOpen, type, scopeId, popModal}
}

export default useModal