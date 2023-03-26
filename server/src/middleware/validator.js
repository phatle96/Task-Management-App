const express = require('express');
const { validationResult } = require('express-validator');

const validator = () => (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    } catch (err) {
        return res.status(400).json({ 400: 'Bad Request' });
    }
};



module.exports = validator;