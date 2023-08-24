import { useState } from "react"
import IScope from "../assets/commonInterfaces/IScope"

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState("")
    const [scope, setScope] = useState<IScope>({} as IScope)

    const popModal = async (value: boolean, type: "create" | "update", scope?:IScope) => {
        setIsOpen(value)
        setType(type)
        if (scope){
            setScope(scope)
        }
    }


    return{ isOpen, setIsOpen, type, scope, popModal}
}

export default useModal