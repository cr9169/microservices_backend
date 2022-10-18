import IPerson from "./personInterface";

export interface IGroup {
    _id?: string,
    name: string,
    groups: string[],
    people: string[] 
}

export default IGroup;