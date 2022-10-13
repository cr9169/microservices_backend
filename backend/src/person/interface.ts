import IGroup from "../group/interface";

export interface IPerson {
    _id?: string,
    firstName: string,
    age: number,
    groups: string[], 
    lastName: string
}

export default IPerson;