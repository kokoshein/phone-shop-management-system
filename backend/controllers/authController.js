const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const {
            full_name,
            username,
            password,
            role
        } = req.body;

        User.findByUsername(
            username,
            async (err, user) => {
                if (user) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already exists"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                User.create(
                    {
                        full_name,
                        username,
                        password: hashedPassword,
                        role: role || "staff"
                    },
                    function (err) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        res.status(201).json({
                            success: true,
                            message:
                                "User registered successfully"
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(
        username,
        async (err, user) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    username: user.username,
                    role: user.role
                }
            });
        }
    );
};