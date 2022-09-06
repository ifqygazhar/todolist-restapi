import User from "../models/User.js"
import CryptoJS from "crypto-js"


export async function UpdateUser(req,res) {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.ENC_PASS).toString()
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new:true
            }
        )

        return res.status(200).json({
            status: true,
            message: "success update user",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "failed update user"
        })
    }

}

export async function DeleteUser(req,res) {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            status: true,
            message: "success delete user"
        })
    } catch (err) {
        return res.status(404).json({
            status: true,
            message: "failed delete user"
        })
    }
}

export async function FindById(req,res) {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json({
            status: true,
            message: "success find user",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (err) {
        return res.status(404).json({
            status: true,
            message: "failed find user"
        })
    }
}

export async function FindAll(req,res) {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find().limit(10)
        return res.status(200).json({
            status: true,
            message: "success find user",
            data: users
        })
    } catch (err) {
        return res.status(404).json({
            status: true,
            message: "failed find user"
        })
    }
}