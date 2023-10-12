const express =  require("express");
const {insertData, deleteData, allSalaryStats, departmentSalaryStats, sub_departmentSalaryStats} = require('../controller/data.controller')
const router = express.Router();
/**
 * Endpoint: /api/data
*/

// to insert New data
router.route('/insert').post(insertData);

//for deletion 
router.route('/delete').delete(deleteData);

// to get all salary stats + query for On-Contract
router.route('/all/salary').get(allSalaryStats);

// to get salary department wise
router.route('/department/salary').get(departmentSalaryStats);

// to get sub-department and department salary
router.route('/subdepartment/salary').get(sub_departmentSalaryStats);










module.exports = router;

