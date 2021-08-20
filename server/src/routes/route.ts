/*const express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



const cors = require('cors')
const morgan = require('morgan')
const router = express.Router();

router.post('/register', urlencodedParser, (req, res) => {
	res.send({
		message: `Hello ${req.body.email} ou register`
	})
})


module.exports = router;
*/

const UserController = require('../controller/UserController')

module.exports = (app:any) => {
	
	
	app.get('/api/countrylist', UserController.countrylist)
	app.post('/api/updateprofile', UserController.updateprofile)
	
	
}












