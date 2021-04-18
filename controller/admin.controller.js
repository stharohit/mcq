const Admin = require("../modal/admin.modal");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        bycrypt.hash(password, 10, (error, hash) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            } else {
                Admin.build({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: 'ADMIN'
                }).save().then((admin) => {
                    const payload = {
                        id: admin.id,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        email: admin.email,
                        role: admin.role
                    };
                    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '60m' });
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
    try {
        const { email, password } = req.body;
        Admin.findOne({
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
            const payload = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role
            };
            res.status(400).json({
                success: false,
                token: jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '60m' })
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