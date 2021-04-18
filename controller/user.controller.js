const User = require("../modal/user.modal");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        bycrypt.hash(password, 10, (error, hash) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            } else {
                User.build({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: 'USER'
                }).save().then((user) => {
                    const token = jwt.sign({ id: user.id,firstName, lastName, email, role: user.role }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '60m' });
                    return res.status(200).json({
                        success: true,
                        token: token
                    })
                }).catch((error) => {
                    return res.status(500).json({
                        success: false,
                        error: error.errors[0].message
                    });
                })
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        });
    }
}

const login = (req, res) => {
    try{
        const { email, password } = req.body;
        User.findOne({
            where: {
                email: email
            }
        }).then(async (data) => {
            const isPassword = await bycrypt.compare(password, data.password);
            if (!isPassword) {
                return res.status(402).json({
                    success: false,
                    error: 'Password does not match'
                })
            }
            res.status(400).json({
                success: false,
                token: jwt.sign({id: data.id, firstName: data.firstName, lastName: data.lastName, email: data.email}, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '60m' })
            })
        }).catch((error) => {
            return res.status(404).json({
                success: false,
                error: error.message
            })
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        });
    }
}

module.exports = {
    signUp,
    login
}