import {useState } from "react";

import INearOptions from "../assets/commonInterfaces/INearOptions";

const useNearOptions = () => {
    const [nearOptions, setNearOptions] = useState<INearOptions[]>([])

    const addOption = async (firstOption:string, secondOption:string, setFirstOption:React.Dispatch<React.SetStateAction<string>>, setSecondOption:React.Dispatch<React.SetStateAction<string>>, baseTextContent: string) => {
        const newOption:INearOptions = {firstOption, secondOption}
        if (!baseTextContent.includes(firstOption) || !baseTextContent.includes(secondOption)){
            if (window.confirm("One or more selected options are not in the base text content! Are you sure to proceed anyway?")) {
                setNearOptions([...nearOptions, newOption])
            }
            setFirstOption("")
            setSecondOption("")
            return
        }
        setNearOptions([...nearOptions, newOption])
        setFirstOption("")
        setSecondOption("")
    };

    const deleteOption = async (firstOption: string, secondOption:string) => {

        try {
            let filteredRows = nearOptions.filter(option => option.firstOption !== firstOption && option.secondOption !== secondOption );
            setNearOptions(filteredRows);

        } catch (error) {
            console.log(error);
        }
    };

    return {nearOptions, addOption, deleteOption}
  };
  
export default useNearOptions;