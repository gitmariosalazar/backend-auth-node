import {Router} from "express";
import {register, login, verifyToken, logout, profile} from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import {validateLoginSchema, validateRegisterteSchema} from "../middlewares/validator.middlewares.js";
import {loginSchema, registerSchema} from "../schemas/auth.schema.js";

const router = Router()

router.post('/register', validateRegisterteSchema(registerSchema), register)
router.post('/login', validateLoginSchema(loginSchema), login)
router.get('/verify', verifyToken)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router