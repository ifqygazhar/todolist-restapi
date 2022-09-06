import express from "express"
import { CreateTodo, DeleteTodo, FindAll, FindById, UpdateTodo } from "../controllers/todo.controller.js"
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/jwt.middleware.js"

const router = express.Router()

router.post('/create/:id',verifyTokenAndAuthorization,CreateTodo)
router.put('/edit/:id/:todoId',verifyTokenAndAuthorization,UpdateTodo)
router.delete('/delete/:id/:todoId',verifyTokenAndAuthorization,DeleteTodo)
router.get('/find/:id',verifyTokenAndAuthorization,FindById)
router.get('/findall',verifyTokenAndAdmin,FindAll)

export default router