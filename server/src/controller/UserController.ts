const express = require('express');
var multer  = require('multer')
var fs  = require('fs')
import mysql from 'mysql2'

const path = require('path');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'global_test'
  });
  
  connection.connect();

  interface Requests {
	userid: string,
	avatar: File,
  }

  const storage = multer.diskStorage({
	destination: './public/avatars/',
	filename: function(req: Requests, file: any, cb: (error: Error | null, destination: string) => void ) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

const fileFilter = (req: Requests, file: any, cb : any) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, true);
	}else{
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	fileFilter: fileFilter
}).single('avatar');

module.exports = {
	
    submitprofile(req: any, res: any) {
        try {
          upload(req, res, (err:any) =>{
              
            if(err){
                res.send('An error acoured ..')
            }else{
                if(req.file == undefined){
                    res.send('undefined File')	
                }else{
            
                    let filename = req.file.filename 
                    connection.query(`UPDATE users SET avatar='${filename}' WHERE id='${req.body.userid}'`, function (err, results, fields) {
                        if (err) throw err
                        res.send(filename)
                      });
                    
                }
                
            }
        })	
        
    
    } catch (error){
        res.status(500).send({
            error: 'An error occured to create album.'
        })
    }
     
},
userdetails(req: any, res: any)  {
    let data = req.body
      connection.query(`SELECT *, (SELECT COUNT(id) FROM user_follower WHERE userid=users.id) totalflowing, (SELECT COUNT(id) FROM user_follower WHERE follow_user=users.id) totalfollower FROM users WHERE id ='${data.userid}'`, function (err, results, fields) {
        if (err) throw err
        res.send(results)
      });
},	

getfollowinglist(req: any, res: any)  {
  let data = req.body
    connection.query(`SELECT user_follower.follow_user , users.* FROM user_follower INNER JOIN users ON user_follower.follow_user = users.id WHERE user_follower.userid='${data.userid}'`, function (err, results, fields) {
      if (err) throw err
      res.send(results)
    });
},	

getfollowerlist(req: any, res: any)  {
  let data = req.body
    connection.query(`SELECT user_follower.userid , users.* FROM user_follower INNER JOIN users ON user_follower.userid = users.id WHERE user_follower.follow_user='${data.userid}'`, function (err, results, fields) {
      if (err) throw err
      res.send(results)
    });
},

updateprofile(req: any, res: any)  {
  let data = req.body
    connection.query(`UPDATE users SET username='${data.username}', firstname='${data.firstname}', lastname='${data.lastname}', email='${data.email}',phone='${data.phone}',gender='${data.select}' WHERE id='${data.userid}' `, function (err, results, fields) {
      if (err) throw err
      res.send(results)
    });
},

countrylist(req:any, res:any) {
	connection.query(`SELECT * FROM country`, function (err, results, fields) {
      if (err) throw err
      res.send(results)
    });
}
	
}