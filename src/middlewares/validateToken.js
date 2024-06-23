import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from "../config.js";

export const authRequired = (req, res, next) => {
    try {
        const {token} = req.cookies
        const domain = `http://${req.get('host')}/api/docs`;
        console.log(domain);
        if (!token) {
            return res.status(401).json({error: null, user: null, message: 'No token found!, Authorization denied.'})
        }
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({error: null, user: null, message: 'Invalid token'})
            }
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({error: error.message, user: null, message: 'Validate token failed!'})
    }
}
