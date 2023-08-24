import { useContext, useEffect} from "react"
import CustomDrawer from "../../components/CustomDrawer"
import ScopeCard from "../../components/ScopeCard"
import IScope from "../../assets/commonInterfaces/IScope"
import "./index.scss"
import { CustomAuthContext } from "../../contexts/useAuth"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import CustomTextInput from "../../components/Common/CustomTextInput"
import useModal from "../../hooks/useModal"
import useScopes from "../../hooks/useScopes"

const Scopes = () => {
    const {userId} = useContext(CustomAuthContext);

    const {isOpen, setIsOpen, type, scopeId, popModal} = useModal()
    const {name, setName, description, setDescription, getScopes, scopes, sendScope, deleteScope} = useScopes({userId})


    useEffect(() => {
        
        const getAllScopes = async () => {
            await getScopes()
        }
        getAllScopes()
        }
    , [])

    

    return (
        <CustomDrawer>
            <div>
                <h1 className="">Scopes</h1>
                <div className="scope-wrapper">
                    {scopes.map( scope => (
                        <ScopeCard
                            scope = {scope}
                            popModal={popModal}
                            deleteScope={deleteScope}
                        />
                    ))}
                    <ScopeCard isFixed scope={{} as IScope} popModal={popModal} deleteScope={deleteScope}/>
                </div>
            </div>
            <Dialog open={isOpen} onClose={e => setIsOpen(false)}>
                <DialogTitle>{type == "create" ? "Create Scope" : "Update Scope"}</DialogTitle>

                <DialogContent>
                    <CustomTextInput disabled={false} label={"name"} value={name} onChange={(e: any) => setName(e.target.value)} />
                    <CustomTextInput disabled={false} label={"description"} value={description} onChange={(e: any) => setDescription(e.target.value)} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={e => sendScope(type, setIsOpen, scopeId)}>Send</Button>
                    <Button onClick={e => setIsOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </CustomDrawer>
    )
}

export default Scopes