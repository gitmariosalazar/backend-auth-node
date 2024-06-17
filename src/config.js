import {configDotenv} from "dotenv";
configDotenv()

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb+srv://mariosalazar10utn:1001590650ANDmar10@cluster0.iftvxqz.mongodb.net/mariosalazar";
export const TOKEN_SECRET = process.env.SECRET_KEY;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";