// controllers/authController.js
import {hashPassword} from "../libs/bcrypt.js";
import User from "../models/user.model.js";
import {randomBytes} from 'crypto';

export const findOrCreateUser = async (profile) => {
    const {id, displayName, emails, photos, provider} = profile;
    const email_address = emails[0].value || null;
    const photo = photos[0].value
    const username = getUsernameFromEmail(email_address)
    let user = await User.findOne({email: email_address});
    if (!user) {
        user = await User.create({
            user_id: id,
            username: username,
            email: email_address,
            password: await hashPassword('password-mario'),
            name: displayName,
            photo: photo,
            provider: provider
        });
    }
    return user;
};


export const register = async (req, res) => {
    const {name, email, password, verifypassword} = req.body
    try {
        let userFoundByEmail = await findUserOne(email)
        if (userFoundByEmail != null) {
            return res.status(200).json({error: 'The email already exists!', message: 'The username already exists!', user: null})
        }
        const password_hash = await hashPassword(password)
        if (userFoundByEmail === null) {
            const username = getUsernameFromEmail(email)
            userFoundByEmail = await User.create({
                user_id: randomBytes(16).toString('hex'),
                username: username,
                email: email,
                password: password_hash,
                name: name,
                photo: 'https://i.postimg.cc/CxVYM67x/user-icon.png',
                provider: 'local'
            });
        }
        //const user = await newUser.save()
        return res.status(201).json({error: null, user: userFoundByEmail, message: 'Create user successfully!'})
    } catch (error) {
        res.status(500).json({error: error, message: 'Failed on create User!', user: null})
    }
}

export const findUserOne = async (email) => {
    let user = await User.findOne({email: email});
    if (!user) {
        return null
    }
    return user;
};

export const SignIn = async (username, password) => {
    let user = await User.findOne({email: username})
    if (!user) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({error: null, user: null, message: 'User or email is not correct!'})
    const token = createToken(user)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3600000
    });
    res.json({error: null, user: user_token, message: 'Login successfully!', token: token})
}


function getUsernameFromEmail (email) {
    if (typeof email === 'string' && email.includes('@')) {
        return email.split('@')[0];
    }
    return null;
}