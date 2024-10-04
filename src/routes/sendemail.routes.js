import { Router } from "express";
import { sendEmail } from "../controllers/sendemail.controller.js";
const router_email = Router();


router_email.post('/sendemail', sendEmail);


export default router_email;
