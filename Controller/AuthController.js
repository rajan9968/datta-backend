// const UserModels = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createAuth } = require('../Dao/authDao');
const e = require("express");
const db = require('../config/db');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Call DAO function (it already handles checking existing user & hashing)
        const result = await createAuth({ name, email, password });

        return res.status(result.status).json({
            success: result.success,
            message: result.message,
            data: result.data || null
        });

    } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if user exists
        const user = await db('users').where({ email: email }).first();
        if (!user) {
            return res.status(403).json({ message: "Invalid Email", success: false });
        }

        // 2️⃣ Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid Password", success: false });
        }

        // 3️⃣ Generate JWT token
        const jwToken = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4️⃣ Respond with success
        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            token: jwToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error in login controller:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "JWT token has expired. Please log in again.", success: false });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid JWT token", success: false });
        }

        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
}