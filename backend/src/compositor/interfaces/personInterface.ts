import IGroup from "./groupInterface";

export interface IPerson {
    _id?: string,
    firstName: string,
    age: number,
    groups: string[], 
    lastName: string
}

export default IPerson;