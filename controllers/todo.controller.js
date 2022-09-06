import Todo from "../models/Todo.js"


export async function CreateTodo(req,res) {
    const newTodo = new Todo({
        userId: req.params.id,
        todo: req.body.todo
    })

    try {
        const savedTodo = await newTodo.save()
        return res.status(201).json({
            status: true,
            message: "success create todo",
            data: savedTodo
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "failed create todo"
        })
    }
}

export async function UpdateTodo(req,res) {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(
            req.params.todoId,
            {
                $set: req.body
            },
            {
                new:true
            }
        )

        return res.status(200).json({
            status: true,
            message: "success update todo",
            data: updateTodo
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "failed update todo"
        })
    }
}

export async function DeleteTodo(req,res) {
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        return res.status(200).json({
            status: true,
            message: "success delete todo"
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "failed delete todo"
        })
    }
}

export async function FindById(req,res) {
    try {
        const findTodo = await Todo.find({userId: req.params.id})
        return res.status(200).json({
            status: true,
            message: "success find todo",
            data: findTodo
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "failed find todo"
        })
    }
}

export async function FindAll(req,res){
    const query = req.query.new
    try {
        const todolist = query ? await Todo.find().sort({_id: -1}).limit(10) : await Todo.find().limit(10)
        return res.status(200).json({
            status: true,
            message: "success find all todolist",
            data: todolist
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "failed find all todolist"
        })
    }
}