# Getting started with my PW Assignment


Please refer to the tutorials for instructions on configuring, running, and
deploying these samples.

## My Hosted Link on AWS
- [ Link ](http://35.154.71.190:4000/)

* Make sure you've got the required environment variables set as:
  ```
  PORT=4000
  JWT_SECRET = 
  JWT_EXPIRATION = 
  ```
* Follow this command for setup
```
git clone https://github.com/M0hitSingh/pw-assign.git
npm install
npm start
```

## Tests
-  Login and Authentication
   ```
     { 
        "user":"mohit",
        "password":"123456789"
     }
   ```
- Insert Data
   - Type : POST 
   - End Point :  ```http://35.154.71.190:4000/api/data/insert```
   - Body
    ```
    { 
        "name": "Abhishek", 
        "salary": "145000", 
        "currency": "USD", 
        "department": "Engineering", 
        "sub_department": "Platform" 
    }
    ```
- Get All Salary
   - Type : GET 
   - End Point :  http://35.154.71.190:4000/api/data/all/salary
   - Response :
     ```
     {
        "message": "success",
        "error": false,
        "code": 200,
        "data": [
            {
                "department": "Banking",
                "mean": 90000,
                "max": 90000,
                "min": 90000
            },
            {
                "department": "Engineering",
                "mean": 145000,
                "max": 145000,
                "min": 145000
            },
            {
                "department": "Operations",
                "mean": 30,
                "max": 30,
                "min": 30
            }
        ]
      }
     ```

- Delete Data
    - Type : DELETE
    - End Point : ```http://35.154.71.190:4000/api/data/delete?name=<name>```
 
- Get Salary Department Wise
   - Type : GET 
   - End Point :  http://35.154.71.190:4000/api/data/department/salary
   - Response :
    ```
    { 
        "message": "success",
        "error": false,
        "code": 200,
        "data": [
            {
                "department": "Banking",
                "mean": 90000,
                "max": 90000,
                "min": 90000
            },
            {
                "department": "Engineering",
                "mean": 145000,
                "max": 145000,
                "min": 145000
            }
        ]
      }
    ```
  - Get Salary Department and Sub Department Wise
   - Type : GET 
   - End Point :  http://35.154.71.190:4000/api/data/subdepartment/salary
