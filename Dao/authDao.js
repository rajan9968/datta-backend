const db = require('../config/db');
const bcrypt = require('bcrypt');

const createAuth = async (data) => {
    try {
        // Check if user already exists
        const existingUser = await db('users').where({ email: data.email }).first();
        if (existingUser) {
            return {
                status: 400,
                success: false,
                message: "User already exists"
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Insert new user
        const [userId] = await db('users').insert({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            status: 1
        });

        // Fetch the newly created user
        const newUser = await db('users').where({ id: userId }).first();

        return {
            status: 201,
            success: true,
            message: "User created successfully",
            data: newUser
        };

    } catch (error) {
        console.error("Error in createAuth:", error);
        return {
            status: 500,
            success: false,
            message: "Internal server error"
        };
    }
};

module.exports = {
    createAuth
};
