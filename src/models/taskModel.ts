import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    completionStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const Task = model("Task", taskSchema);
