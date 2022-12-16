import { Schema, model, models, Document } from 'mongoose'


interface ITask extends Document {
    title: string;
    status: boolean;
}


const taskSchema: Schema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Task = models.Task || model<ITask>("Task", taskSchema)
export default Task