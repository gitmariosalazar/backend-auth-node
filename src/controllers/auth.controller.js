
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js";
import {createAccessToken} from "../libs/jwt.js"
import {configDotenv} from "dotenv";
configDotenv()


export const register = async (req, res) => {
    const {username, email, password} = req.body
    try {
        const userFoundByEmail = await User.findOne({email: email})
        const userFoundByUsername = await User.findOne({username: username})
        if (userFoundByEmail && userFoundByUsername) {
            return res.status(400).json({error: ['The email already exists!', 'The username already exists!'], message: 'The username already exists!', user: userFoundByUsername})
        }
        if (userFoundByEmail) return res.status(400).json({error: ['The email already exists!'], message: 'The email already exists!', user: userFoundByEmail})
        if (userFoundByUsername) return res.status(400).json({error: ['The username already exists!'], message: 'The username already exists!', user: userFoundByUsername})
        console.log("object");
        const password_hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username, email, password: password_hash
        })
        const user = await newUser.save()
        const user_token = {
            id: user._id, username: user.username, email: user.email, createdAt: user.createdAt
        }
        console.log(process.env.NODE_ENV_TEST);
        const token = await createAccessToken(user_token)
        if (process.env.NODE_ENV_TEST === "development") {
            console.log("Development");
            res.cookie("token", token, {
                // can only be accessed by server requests
                httpOnly: true,
                // path = where the cookie is valid
                path: "/",
                // domain = what domain the cookie is valid on
                domain: "localhost",
                // secure = only send cookie over https
                secure: false,
                // sameSite = only send cookie if the request is coming from the same origin
                sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
                // maxAge = how long the cookie is valid for in milliseconds
                maxAge: 3600000, // 1 hour
            });
        }
        console.log(process.env.NODE_ENV_TEST);

        if (process.env.NODE_ENV_TEST === "production") {
            console.log("Production");
            res.cookie("token", token, {
                // can only be accessed by server requests
                httpOnly: true,
                // path = where the cookie is valid
                path: "/",
                // secure = only send cookie over https
                secure: true,
                // sameSite = only send cookie if the request is coming from the same origin
                sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
                // maxAge = how long the cookie is valid for in milliseconds
                maxAge: 3600000, // 1 hour
            });
        }
        return res.json({error: null, user: user_token, message: 'Create user successfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error, message: 'Failed on create User!', user: null})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.params
    try {
        var referer = req.headers.referer;
        var origin = req.headers.referer;
        console.log("Referer name: ", referer);
        console.log("Origin name: ", origin);
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const user_token = {
            id: user._id, username: user.username, email: user.email, createdAt: user.createdAt
        }
        const token = await createAccessToken(user_token)

        if (process.env.NODE_ENV_TEST === "development") {
            console.log("development", process.env.NODE_ENV_TEST);
            res.cookie("token", token, {
                httpOnly: false,
                path: "/",
                secure: true,
                sameSite: "none",
                maxAge: 45 * 60 * 1000, // 1 hour
            });
        }

        if (process.env.NODE_ENV_TEST === "production") {
            console.log("production", process.env.NODE_ENV_TEST);

            res.cookie("token", token, {
                httpOnly: true,
                path: "/",
                secure: true,
                sameSite: "none",
                maxAge: 45 * 60 * 1000, // 1 hour
            });
        }
        res.json({error: null, user: user_token, message: 'Login successfully!', token: token})
    } catch (error) {
        res.status(500).json({error: error, message: 'Login failed!', user: null})
    }
}

export const verifyToken = async (req, res) => {

    const {token} = req.cookies;
    console.log(token);
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

export const logout = async (req, res) => {
    try {
        console.log("coooooooooooode ", req.cookies);
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });
        return res.sendStatus(200);
        //return res.status(200).json({error: null, user: 'user', message: 'Logout successfully!'})
    } catch (error) {
        res.status(500).json({error: error, message: 'Logout failed!', user: null})
    }
}

export const profile = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        return res.status(400).json({error: null, user: user, message: 'User not found!'})
    }
    return res.json(user)
}
