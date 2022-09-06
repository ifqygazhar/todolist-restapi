import Token from "../models/Token.js"
import jwt  from "jsonwebtoken"

const verifyAccessToken = async (req,res,next) => {
    const autHeader = req.headers.token
    if (autHeader) {
        const token = autHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,user) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    message: "Token is not valid!"
                })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({
            code: 401,
            message: "You are not authenticate!"
        })
    }
}

export const verifyTokenAndAuthorization = async (req,res,next) => {
    await verifyAccessToken(req,res,() => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                code: 403,
                message: "You are not allowed do that!" 
            })
        }
    })
}

export const verifyTokenAndAdmin = async (req,res,next) => {
    await verifyAccessToken(req,res,() => {
        if (req.user.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                code: 403,
                message: "You are not allowed do that!"
            })
        }
    })
}

export const verifyRefreshToken = async (req,res,next) => {
    const refreshToken = req.body.refresh
    if (refreshToken) {
       const token = await Token.findOne({token: refreshToken})
       if (!token) {
        return res.status(403).json({
            code: 403,
            message: "Invalid refresh token"
        })
       }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY,(err,user) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    message: "Invalid refresh token"
                })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({
            code: 401,
            message: "You are not authenticate!"
        })
    }
}