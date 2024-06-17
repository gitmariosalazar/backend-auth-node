import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js";

const secret_key = TOKEN_SECRET
export function createAccessToken (payload) {

    console.log("SK ", secret_key, "TK ", TOKEN_SECRET);
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, secret_key, {expiresIn: "1h"}, (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    })
}