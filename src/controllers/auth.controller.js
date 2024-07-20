
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js";
import {createAccessToken, createToken, isBlacklisted} from "../libs/jwt.js"
import {configDotenv} from "dotenv";
import {findUserOne} from "./authController.js";
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

        const password_hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username, email, password: password_hash
        })
        const user = await newUser.save()

        const token = await createToken(user_token)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        });
        return res.json({error: null, user: token, message: 'Create user successfully!'})
    } catch (error) {
        res.status(500).json({error: error, message: 'Failed on create User!', user: null})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        var referer = req.headers.referer;
        var origin = req.headers.referer;
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const user_token = {
            id: user._id, username: user.username, email: user.email, createdAt: user.createdAt
        }
        const token = await createAccessToken(user_token)
        /*
                if (process.env.NODE_ENV_TEST === "development") {
                    console.log("development", process.env.NODE_ENV_TEST);
                    res.cookie("token", token, {
                        httpOnly: false,
                        path: "/",
                        secure: true,
                        sameSite: "none",
                        maxAge: 45 * 60 * 1000, // 1 hour
                        domain: "localhost"
                    });
                }
        
                if (process.env.NODE_ENV_TEST === "production") {
                    console.log("production", process.env.NODE_ENV_TEST);
        
                    res.cookie("login", token, {
                        httpOnly: false,
                        path: "/",
                        secure: true,
                        sameSite: "none",
                        maxAge: 45 * 60 * 1000, // 1 hour
                        domain: "blog-mario-salazar.vercel.app"
                    });
                }
            */
        res.json({error: null, user: user_token, message: 'Login successfully!', token: token})
    } catch (error) {
        res.status(500).json({error: error, message: 'Login failed!', user: null})
    }
}

export const verifyToken = async (req, res) => {

    const token = req.cookies.jwt;
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

export const profile = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        return res.status(400).json({error: null, user: user, message: 'User not found!'})
    }
    return res.json(user)
}
