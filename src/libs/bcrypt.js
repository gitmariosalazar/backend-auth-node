import bcrypt from 'bcrypt';
import {hashSync} from 'bcrypt';
const saltRounds = 12;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await hashSync(password, salt);
    return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

export {hashPassword, verifyPassword}
