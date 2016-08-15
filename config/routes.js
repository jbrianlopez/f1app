const express = require('express')
const router = express.Router()
var driverController = require('../controllers/driver_controller')
//
// router.get('/', function (req, res) {
//   res.status(200).json({message: 'hello world!'})
// })




// GET all resources
router.get('/drivers', driverController.showAllDrivers)

// GET one driver
router.get('/drivers/:driverId', driverController.showOneDriver)





module.exports = router
