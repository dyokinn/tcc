import { createContext, useState } from "react"

export const CustomDrawerContext = createContext({} as any)           

// Exporta funcionamento do contexto no componente de rotas
export function DrawerContextProvider(props:any) {
    
    // Hook de estado para o contexto
    const [open, setDrawerOpen] = useState(false)

    function setOpen(value: boolean){
      setDrawerOpen(value)
    }

    return(
      <CustomDrawerContext.Provider value = {{open, setOpen}}>
        {props.children}
      </CustomDrawerContext.Provider>
    )
} 