import { Dispatch, SetStateAction, useState } from "react";
import IScope from "../assets/commonInterfaces/IScope";
import api from "../assets/api";
import IText from "../assets/commonInterfaces/IText";

interface IUseTexts {
    scope: IScope, 
    setIsLoading:Dispatch<SetStateAction<boolean>>
}

const useTexts = (props: IUseTexts) => {
    const [texts, setTexts] = useState<IText[]>([])

    const addText = async (newText:string, setTextField:React.Dispatch<React.SetStateAction<string>>) => {
        try {
            props.setIsLoading(true)
            const response = await api.post(
                "/texts/", {
                    "scope_id": props.scope.id,
                    "texts": [newText]
                }
            )
            setTexts([...texts, response.data[response.data.length - 1]])
            setTextField("")
            props.setIsLoading(false)
        } catch (error) {
            console.log(error)
            props.setIsLoading(false)
        }
    };

    const deleteText = async (id: any) => {

        try {
            props.setIsLoading(true)

            const response = await api.delete(
                "/texts/" + id,
            )

            let filteredRows = texts.filter(text => text.id !== id);
            setTexts(filteredRows);
            props.setIsLoading(false)

        } catch (error) {
            props.setIsLoading(false)
            console.log(error);
        }
    };

    return {texts, setTexts, addText, deleteText}
  };
  
export default useTexts;