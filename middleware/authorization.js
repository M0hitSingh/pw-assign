const express = require('express')
const jwt = require('jsonwebtoken')
const { createCustomError } =  require("../errors/customAPIError");
const db =  require('../utils/db.connect');

const errorMessage = "You do not have permissions to perform this action";

const authorization = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        const message = "Unauthenticaded No Bearer";
        return next(createCustomError(message, 401));
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload =await jwt.verify(token, process.env.JWT_SECRET)
        db.db.get('SELECT user FROM user where user=?',payload.user,(err,row)=>{
            if(err) return next(createCustomError("Invalid JWT",401));
            req.user = {row}
        })
        next();
    } catch (error) {
        let message;
        let err
        if (error instanceof jwt.TokenExpiredError) {
            message = "Token Expired";

        } else {
            message = "Authentication failed invalid JWT";
        }

        return next(createCustomError(message, 401));
    }
};


module.exports = { authorization};
