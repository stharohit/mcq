const jwt = require('jsonwebtoken');

const authHandler = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) return res.status(401).json({
        success: false,
        error: 'Access denied!'
    });

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, data) => {
        if (error) return res.status(403).json({
            success: false,
            error: 'Unauthorized access!'
        });
        req.token = data;
        next();
    })
}

const adminAccessHandler = (req, res, next) => {
    if (req.token.role !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            error: 'Unauthorized access!'
        })
    }
    next();
}

const userAccessHandler = (req, res, next) => {
    if (req.token.role !== 'USER') {
        return res.status(403).json({
            success: false,
            error: 'Unauthorized access!'
        })
    }
    next();
}

module.exports = {
    authHandler,
    adminAccessHandler,
    userAccessHandler
};