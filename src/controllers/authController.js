// controllers/authController.js
import User from "../models/user.model.js";

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
            password: '',
            name: displayName,
            photo: photo,
            provider: provider
        });
    }
    return user;
};

export const findUserOne = async (email) => {
    let user = await User.findOne({email: email});
    if (!user) {
        return null
    }
    return user;
};


function getUsernameFromEmail (email) {
    if (typeof email === 'string' && email.includes('@')) {
        return email.split('@')[0];
    }
    return null;
}