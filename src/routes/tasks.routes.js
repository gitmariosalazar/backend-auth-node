import {Router} from "express";
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controllers/tasks.controller.js";
import {createTaskSchema} from "../schemas/task.schema.js";
import {validateRegisterteSchema} from "../middlewares/validator.middlewares.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/tasks", verifyToken, getTasks);

router.post("/tasks", verifyToken, validateRegisterteSchema(createTaskSchema), createTask);

router.get("/tasks/:id", verifyToken, getTask);

router.put("/tasks/:id", verifyToken, updateTask);

router.delete("/tasks/:id", verifyToken, deleteTask);


export default router