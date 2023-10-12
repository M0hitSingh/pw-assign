const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const db = require('../utils/db.connect')


const insertData = asyncWrapper(async (req, res, next) => {
    try {
        const { name, salary, currency, department, sub_department, on_contract } = req.body;
        db.db.run(
            `INSERT INTO dataset(name, salary, currency, department, sub_department, on_contract) VALUES(?, ?, ?, ?, ?, ?);`,
            [name, salary, currency, department, sub_department, on_contract],
            (err, row) => {
                if (err) return next(createCustomError(err, 400));
                res.json(sendSuccessApiResponse('Data Inserted',201));
            }
        );
    } catch (err) {
        next(createCustomError(err, 400));
    }
});

const deleteData = asyncWrapper(async (req, res, next) => {
    try {
        const name = req.query.name; // TODO we can use Id to delete ( it will be good practice if we use ID to delete data )
        db.db.run(
            `DELETE FROM dataset WHERE name = ?;`,
            [name],
            (err) => {
                if (err) {
                    return next(createCustomError(err, 400));
                }
                res.json({ message: 'Data deleted successfully' });
            }
        );
    } catch (err) {
        next(createCustomError(err, 400));
    }
});

const allSalaryStats = asyncWrapper(async (req,res,next)=>{
    try {
        const on_contract = req.query.on_contract || false;
        const query = "SELECT AVG(salary) AS mean, MAX(salary) AS max, MIN(salary) AS min_salary FROM dataset";
        if(on_contract) query = "SELECT AVG(salary) AS mean, MAX(salary) AS max, MIN(salary) AS min_salary FROM dataset WHERE on_contract = 1 ";
        db.db.all(query, (err, rows) => {
            if (err) {
                return next(createCustomError(err, 400));
            }            
            res.json(sendSuccessApiResponse(rows,200));
        });
    } catch (err) {
        next(createCustomError(err, 400));
    }
})

const departmentSalaryStats = asyncWrapper(async (req, res, next) => {
    try {
        const query = "SELECT department, AVG(salary) AS mean, MAX(salary) AS max, MIN(salary) AS min FROM dataset GROUP BY department";
        db.db.all(query, (err, rows) => {
            if (err) {
                return next(createCustomError(err, 400));
            }
            res.json(sendSuccessApiResponse(rows,200));
        });
    } catch (err) {
        next(createCustomError(err, 400));
    }
});

const sub_departmentSalaryStats = asyncWrapper(async (req,res,next)=>{
    try{
        const query = `
            SELECT 
                department,
                sub_department,
                (SELECT AVG(salary) FROM dataset AS d2 WHERE d2.department = d.department AND d2.sub_department = d.sub_department) AS mean,
                (SELECT MAX(salary) FROM dataset AS d2 WHERE d2.department = d.department AND d2.sub_department = d.sub_department) AS max,
                (SELECT MIN(salary) FROM dataset AS d2 WHERE d2.department = d.department AND d2.sub_department = d.sub_department) AS min
            FROM dataset AS d
            GROUP BY department, sub_department
        `;
        db.db.all(query, (err, rows) => {
            if (err) {
                return next(createCustomError(err, 400));
            }

            res.json(sendSuccessApiResponse(rows,200));
        });
    } catch (err) {
        next(createCustomError(err, 400));
    }
})


module.exports = {
    insertData,
    deleteData,
    allSalaryStats,
    departmentSalaryStats,
    sub_departmentSalaryStats
}