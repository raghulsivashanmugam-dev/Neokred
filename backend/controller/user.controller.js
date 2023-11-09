const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../model/User");

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        let result = {
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        const payload = {
            result,
        };

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: '10d',
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    data: result,
                    accessToken: token,
                    message: 'User registered successfully',
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            email,
        });
        if (!user)
            return res.status(400).json({
                message: "User does not exists",
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect email or password",
            });

        let result = {
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        const payload = {
            result,
        };
        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: '10d',
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    data: result,
                    accessToken: token,
                    message: 'User login successfully',
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}