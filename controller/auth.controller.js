const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const db = require('../utils/db.connect')
const jwt = require('jsonwebtoken')



// User Login
const login = asyncWrapper(async(req,res,next)=>{
    try{
        const {user,password} = req.body;
        if(!user) return next(createCustomError("please provide user",400));
        db.db.get(`SELECT * FROM user where user=? and password=?`,[user,password],(err,row)=>{
            console.log(err)
            if (!row) {
                return next(createCustomError("Incorrect Credentials! Please Go to My Github Readme :)",400));
            }
            // genrating JWT token
            const token = jwt.sign({user:row.user}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            res.status(200).json(sendSuccessApiResponse({row,token},200));
        })
    }
    catch(err){
        next(createCustomError(err,400));
    }
});

module.exports = {
    login
}