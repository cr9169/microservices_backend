import mongoose from "mongoose";
import IPerson from "./interface";
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    groups: {
        type: Array<String>,
        ref: 'group',
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

personSchema.index({
    firstName: 1,
    lastName: 1,
    age: -1
});

export const personModel = mongoose.model<IPerson & mongoose.Document>('person', personSchema);