import { Router } from "express";
import { sendEmail } from "../controllers/sendemail.controller.js";
import { validateSendEmailSchema } from "../middlewares/validator.middlewares.js";
import { messageSchema } from "../schemas/auth.schema.js";
const router_email = Router();


router_email.post('/sendemail', validateSendEmailSchema(messageSchema), sendEmail);


export default router_email;
