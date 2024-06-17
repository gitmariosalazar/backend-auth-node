import {Router} from "express";
import {authRequired} from "../middlewares/validateToken.js";
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controllers/tasks.controller.js";
import {createTaskSchema} from "../schemas/task.schema.js";
import {validateRegisterteSchema} from "../middlewares/validator.middlewares.js";

const router = Router()

router.get("/tasks", authRequired, getTasks);

router.post("/tasks", authRequired, validateRegisterteSchema(createTaskSchema), createTask);

router.get("/tasks/:id", authRequired, getTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);


export default router