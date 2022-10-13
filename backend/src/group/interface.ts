import IPerson from "../person/interface";

export interface IGroup {
    _id?: string,
    name: string,
    groups: string[],
    people: string[] 
}

export default IGroup;