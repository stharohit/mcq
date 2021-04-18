const { check, validationResult } = require("express-validator");

const validatedResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(422).json({ success: false, error: error })
    }

    next();
}

const singupValidator = [
    check('firstName')
        .trim().not().isEmpty()
        .withMessage('First Name is required!'),
    check('lastName')
        .trim().not().isEmpty()
        .isLength({ min: 1 })
        .withMessage('First Name is required!'),
    check('email')
        .trim().not().isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Provide a valid email!'),
    check('password')
        .trim().not().isEmpty()
        .withMessage('Password is required!')
        .isLength({ min: 6, max: 15 })
        .withMessage('Password must be between 6 to 15 characters long')
];

const loginValidator = [
    check('email')
        .trim().not().isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Provide a valid email!'),
    check('password')
        .trim().not().isEmpty()
        .withMessage('Password is required!')
];

module.exports = {
    singupValidator,
    loginValidator,
    validatedResult
}