const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='dataset'", function(error, row) {
		if (row !== undefined) {
			console.log("table exists. cleaning existing records");
			db.run("DELETE FROM dataset", function(error) {
				if (error)
					console.log(error);
			});
		}
		else {
			console.log("creating table")
			db.run(
        `CREATE TABLE dataset (
         id INTEGER PRIMARY KEY,
         name varchar(255) NOT NULL,
         salary int,
         currency varchar(255),
         department varchar(255),
         sub_department varchar(255),
         on_contract BOOLEAN
       );`
       ,(err)=>{
        if(err){
          console.log("Table already exists.");
        }
        db.run(`CREATE TABLE user (
          user varchar(255),
          password varchar(255)
        )`,(err)=>{
          if(err) console.log('User Table Already Exist');
          db.run('INSERT INTO user (user, password) VALUES("mohit","123456789");');
        })
       }
     )
		}
	});
})

  

module.exports = {
  db
}