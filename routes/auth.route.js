const express =  require("express");
const {login} = require('../controller/auth.controller')
const router = express.Router();
/**
 * Endpoint: /api/auth
*/
router.route('/login').post(login);


module.exports = router;

