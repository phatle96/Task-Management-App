const express = require('express');
const zod = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (err) {
        return res.status(400).send(err.errors)
    }
};

export default validate;