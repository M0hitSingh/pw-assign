const asyncWrapper = require('../utils/asyncWrapper');

const login = asyncWrapper((req,res,next)=>{
    const {email , password} = req.body;
    console.log(email,password);
    res.json(email);
});

module.exports = {
    login
}