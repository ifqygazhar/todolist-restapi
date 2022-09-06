import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    userId: { type:String, required:true },
    todo: { type:String, required:true }
},
    { timestamps:true }
)

export default mongoose.model("Todo",TodoSchema)