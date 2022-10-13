import IGroup from "./interface";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groups: {
        type: Array<String>,
        ref: 'group',
        required: true
    },
    people: {
        type: Array<String>,
        ref: 'person',
        required: true
    }
});

export const groupModel = mongoose.model<IGroup & mongoose.Document>('group', groupSchema);