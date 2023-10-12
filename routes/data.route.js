const express =  require("express");
const {insertData, deleteData, allSalaryStats, departmentSalaryStats, sub_departmentSalaryStats} = require('../controller/data.controller');
const { authorization } = require("../middleware/authorization");
const router = express.Router();
/**
 * Endpoint: /api/data
*/

// to insert New data
router.route('/insert').post(authorization,insertData);

//for deletion 
router.route('/delete').delete(authorization,deleteData);

// to get all salary stats + query for On-Contract
router.route('/all/salary').get(authorization,allSalaryStats);

// to get salary department wise
router.route('/department/salary').get(authorization,departmentSalaryStats);

// to get sub-department and department salary
router.route('/subdepartment/salary').get(authorization,sub_departmentSalaryStats);










module.exports = router;

