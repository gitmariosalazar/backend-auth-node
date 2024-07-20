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
            return res.status(401).json({message: "Unauthorized, Token is not valid!!"});
        }
        const secretkey = TOKEN_SECRET
        const decoded = jwt.verify(token, secretkey);
        const user = await findUserOne(decoded.email)
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
};


export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(403).json({error: null, message: "You are not logged in!"});
        }
        const secretkey = TOKEN_SECRET
        const decoded = jwt.verify(token, secretkey);
        const user = await findUserOne(decoded.email);
        req.user = user;
        if (!user) {
            return res.status(401).json({error: null, message: "Unauthorized, User not foud or no is log in!"});
        }
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0) // Fecha de expiración en el pasado
        });
        res.cookie('connect.sid', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0) // Fecha de expiración en el pasado
        });
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
        });
        addToBlacklist(token)
        res.status(200).json({error: null, message: "Logout successfully! Bye, come back soon! 👋"})
    } catch (error) {
        res.status(200).json({error: error.message, message: "Error token: " + error.message});
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
            })
        });
    } catch (error) {

    }
}
