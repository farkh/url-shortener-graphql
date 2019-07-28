import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../../models/User';

export const createUser = async (args) => {
    try {
        const {
            email,
            password,
            confirm,
        } = args.userInput;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists.');

        if (password !== confirm) throw new Error('Passwords are inconsistent.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
        }, (err) => {
            if (err) throw err;
        });

        user.save();

        const token = jwt.sign({ id: user._id }, 'secretkey');

        return { token, password: null, ...user._doc };
    } catch(err) {
        throw err;
    }
};

export const login = async (args) => {
    try {
        const { email, password } = args;
        
        const user = await User.findOne({ email });
        if (!user) throw new Error('Email does not exist.');

        const passwordIsValid = await bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) throw new Error('Password incorrect.');

        const token = jwt.sign({ id: user._id }, 'secretkey');

        return { token, password: null, ...user._doc };
    } catch (err) {
        throw err;
    }
};

export const verifyToken = async (args) => {
    try {
        const decoded = jwt.verify(args.token, 'secretkey');
        const user = await User.findOne({ _id: decoded.id });
        return { ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};
