import {Router} from "express";
import {register, login, verifyToken, logout, profile} from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import {validateLoginSchema, validateRegisterteSchema} from "../middlewares/validator.middlewares.js";
import {loginSchema, registerSchema} from "../schemas/auth.schema.js";

const router = Router()

router.post('/register', validateRegisterteSchema(registerSchema), register)
router.post('/login/:email/:password', validateLoginSchema(loginSchema), login)
router.post('/verify', verifyToken)
router.post('/logout', verifyToken, logout)
router.get('/profile', authRequired, profile)

export default router