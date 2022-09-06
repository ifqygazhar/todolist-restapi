import express from "express"
import { DeleteUser, FindAll, FindById, UpdateUser } from "../controllers/user.controller.js"
import { requiredPassword } from "../middlewares/required.auth.middleware.js"
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/jwt.middleware.js"

const router = express.Router()

router.put('/edit/:id',verifyTokenAndAuthorization,requiredPassword,UpdateUser)
router.delete('/delete/:id',verifyTokenAndAuthorization,DeleteUser)
router.get('/find/:id',verifyTokenAndAdmin,FindById)
router.get('/findall',verifyTokenAndAdmin,FindAll)

export default router