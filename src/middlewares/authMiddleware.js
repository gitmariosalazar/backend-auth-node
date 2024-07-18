import jwt from "jsonwebtoken";
import {config} from 'dotenv';
import {TOKEN_SECRET} from "../config.js";
import {isBlacklisted} from "../libs/jwt.js";
import {findUserOne} from "../controllers/authController.js";

config()

async function getUserById (email) {
    try {
        const user = findUserOne({email: email})
        return user;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    const sessionCookie = req.cookies['connect.sid'];
    console.log('JWT Cookie:', token);
    console.log('Session Cookie:', sessionCookie);
    try {
        //const token = req.cookies.jwt;
        if (!token) {
            return res.status(403).json({message: "No token provided"});
        }
        if (isBlacklisted(token)) {
            return res.status(500).json({message: "Unauthorized, Token is not valid!!"});
        }
        const secretkey = TOKEN_SECRET
        const decoded = jwt.verify(token, secretkey);
        const user = await findUserOne(decoded.email)
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message: "Unauthorized"});
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.status(200).json({
                message: "Logout successfully!"
            }) // Redirigir a la página de inicio de sesión después de cerrar sesión
        });
    } catch (error) {

    }
}

export default verifyToken;