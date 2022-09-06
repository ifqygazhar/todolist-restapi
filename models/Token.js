import mongoose from "mongoose"

const TokenScheme = new mongoose.Schema({
    userId: { type:String, required:true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
})

export default mongoose.model("Token",TokenScheme)