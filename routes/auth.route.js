import express from "express"
import { Login, Logout, RefreshToken, Register } from "../controllers/auth.controller.js"
import { requiredLoginMiddleware, requiredPassword, requiredRegisterMiddleware } from "../middlewares/required.auth.middleware.js"
import { verifyRefreshToken, verifyTokenAndAuthorization } from "../middlewares/jwt.middleware.js"

const router = express.Router()

router.post('/register',requiredRegisterMiddleware,requiredPassword,Register)
router.post('/login',requiredLoginMiddleware,Login)
router.post('/refresh/:id',verifyTokenAndAuthorization,verifyRefreshToken,RefreshToken)
router.post('/logout/:id',verifyTokenAndAuthorization,verifyRefreshToken,Logout)

export default router