import User from "../models/User.js"
import Token from "../models/Token.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

export async function Register(req,res) {
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:  CryptoJS.AES.encrypt(req.body.password,process.env.ENC_PASS).toString()
    })

    try {
        const savedUser = await newUser.save()
        return res.status(201).json({
            status: true,
            message: "success register user",
            data: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "failed register user"
        })
    }
}

export async function Login(req,res) {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "wrong credential"
            })
        }

        const decryptPassword = CryptoJS.AES.decrypt(user.password,process.env.ENC_PASS)
        const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) {
            return res.status(404).json({
              code: 404,
              message: "wrong credentials"
            })
        }

        const accessToken = await generateToken(user._id,user.isAdmin)
        const refreshToken = await generateRefreshToken(user._id,user.isAdmin)

        return res.status(200).json({
            status: true,
            message: "success login",
            data: {
                _id: user._id,
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token: {
                tokenType: "Bearer",
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })
    } catch (err) {
        return res.status(409).json({
            code: 409,
            message: "failed login user"
          })
    }
}

export async function RefreshToken(req,res) {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user not found"
            })
        }

        const accessToken = await generateToken(user._id,user.isAdmin)
        return res.status(200).json({
            status: true,
            message: "success created new token",
            token: accessToken
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "internal server error"
        })
    }
}

export async function Logout(req,res) {
    try {
        const token = await Token.findOne({token: req.body.refresh})
        if (!token) {
            return res.status(200).json({
                status: true,
                message: "succes logout"
            })
        }
        await Token.deleteOne({userId: req.params.id})
        return res.status(200).json({
            status: true,
            message: "succes logout"
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "internal server error"
        })
    }
}

async function generateToken(userId,isAdmin) {
    const payload = {_id:userId,isAdmin: isAdmin}

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )

    return accessToken
}

async function generateRefreshToken(userId,isAdmin) {
    const payload = {_id:userId,isAdmin: isAdmin}

    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    )

    const userToken = await Token.findOne({userId: userId})
    if (userToken) await Token.deleteOne({userId: userId})

    new Token({userId: userId,token:refreshToken }).save()

    return refreshToken

}