const express = require('express');
const cors = require('cors');

const cors_config = (req, res, next) => {
    cors({
        origin: 'http://localhost:3000'
    })
    next();
}

module.exports = cors_config;