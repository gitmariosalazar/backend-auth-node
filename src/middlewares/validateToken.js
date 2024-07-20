import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from "../config.js";
import {findUserOne} from '../controllers/authController.js';
import {isBlacklisted} from '../libs/jwt.js';

export const authRequired = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
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
        return res.status(500).json({error: error.message, user: null, message: 'Validate token failed!'})
    }
}
