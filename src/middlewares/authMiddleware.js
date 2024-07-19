import jwt from "jsonwebtoken";
import {config} from 'dotenv';
import {TOKEN_SECRET} from "../config.js";
import {addToBlacklist, isBlacklisted} from "../libs/jwt.js";
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

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    const sessionCookie = req.cookies['connect.sid'];
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


export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        console.log(token)
        if (!token) {
            return res.status(403).json({message: "You are not logged in!"});
        }
        console.log("0");
        const secretkey = TOKEN_SECRET
        const decoded = jwt.verify(token, secretkey);
        const user = await findUserOne(decoded.email);
        console.log(user);
        req.user = user;
        if (!user) {
            return res.status(500).json({message: "Unauthorized, User not foud!"});
        }
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
        });
        addToBlacklist(token)
        //res.status(200).json({message: "Logout successfully!"})
    } catch (error) {
        res.status(200).json({message: "Error token: " + error.message});
    }
}

export const logout = async (req, res) => {
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
