import IText from "./IText"

interface IScope {
    id: number,
    name: string,
    description: string,
    user_id: number,
    texts: IText[]
}

export default IScope