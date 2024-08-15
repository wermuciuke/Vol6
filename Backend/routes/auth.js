import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();
const SALT_ROUNDS = 10;  
const TOKEN_EXPIRATION = '1h'; 

const handleErrors = (res, error) => res.status(500).json({ error: error.message });

router.post('/register', async (req, res) => {
    const { name, email, age, password } = req.body;
    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new User({ name, email, age, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        handleErrors(res, error);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        res.json({ token });
    } catch (error) {
        handleErrors(res, error);
    }
});

export default router;
