import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { login } from "./userController.js";
import { sendResetEmail } from '../utils/emailService.js';

const handleErrors = (err) => {
    console.error(err.message, err.code);
    let errors = { email: '', password: '', phone: '', dateOfBirth: '', userName: '', name: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'This email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect';
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}
export const get_login = (req, res) => {
    res.send('login');
};

export const post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password);
        const token = genToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const get_register = (req, res) => {
    res.send('register');
};

export const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}


export const post_register = async (req, res) => {
    const { email, password, phone, dateOfBirth, userName, name } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const user = await User.create({ email, password:hashedPassword, phone, dateOfBirth, userName, name });
        const token = genToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const post_forgot_password = async (req, res) => {
    const email = req.body.email;
    try {
        const user = User.findOne({ email });
        if (!user) {
            throw Error('User not found');
        }
        const token = genToken(user._id);
        sendResetEmail(email, token);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to send reset email' });
};
}

export const post_reset_password = async (req, res) => {
    const token = req.cookies.jwt;
    const password = req.body.password;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                const user = await User.findById(decodedToken.id);
                if (!user) {
                   throw Error('User not found');
                }
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);

                user.password = hashedPassword;
                await user.save();
                res.status(200).json({ message: 'Password reset successfully' });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
}

export const get_logout = (req, res) => {
    res.cookie('jwt', 'logged out', { maxAge: 1 });
    res.redirect('/login');
};
