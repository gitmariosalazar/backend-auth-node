
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js";
import {createAccessToken} from "../libs/jwt.js"


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
        console.log(process.env.NODE_ENV);
        const token = await createAccessToken(user_token)
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        return res.json({error: null, user: user_token, message: 'Create user successfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error, message: 'Failed on create User!', user: null})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.params
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
        const user_token = {
            id: user._id, username: user.username, email: user.email, createdAt: user.createdAt
        }
        const token = await createAccessToken(user_token)
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        res.json({error: null, user: user_token, message: 'Login successfully!', token: token})
    } catch (error) {
        res.status(500).json({error: error, message: 'Login failed!', user: null})
    }
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
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
        res.cookie('token', '', {
            expires: new Date(0)
        })
        return res.status(200).json({error: null, user: 'user', message: 'Logout successfully!'})
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
