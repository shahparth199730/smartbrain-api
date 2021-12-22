const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
const knex = require('knex')
const register = require('./controllers/Register.js');
const signin = require('./controllers/Signin.js');
const profile = require('./controllers/Profile.js');
const image = require('./controllers/Image.js');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    // port : 3306,
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data)
// });
// const database = {
// 	users: [
// 		{
// 			id:'123',
// 			name:'parth',
// 			email:'parth@gmail.com',
// 			password:'1234',
// 			entries:0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'321',
// 			name:'shah',
// 			email:'shah@gmail.com',
// 			password:'1234',
// 			entries:0,
// 			joined: new Date()
// 		}
// 	]
// }
// app.use((req, res, next) => {
	
// 	// console.log("Hello");
// 	next();
// })
// app.get("/",(req,res) => {
// 	res.json(database);
// })

app.post("/signin",(req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post("/register",(req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id",(req,res) => {profile.handleProfileGet(req,res,db)})

app.put("/image",(req, res) => {image.handleImage(req,res,db)})

app.post("/imageurl",(req, res) => {image.handleApiCall(req,res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000,() => {
	console.log("App is running successfully!");
})