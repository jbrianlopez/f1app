const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const request = require('request')
const Driver = require('./models/driver')
const Race = require('./models/race')
const Result = require('./models/result')
const mongoose = require('mongoose')
require('dotenv').config({silent: true})
// CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI)
// const api = require('./api')


// ROUTES
const router = require('./config/routes')
app.use('/', router)

// Allow cross-domain Ajax requests
// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })
//
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  next()
})

// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });

// app.post('/', function(req, res, next) {
//  // Handle the post for this route
// });

app.set('views', './views')
app.set('view engine', 'ejs')



// var options = {
//   url: `http://ergast.com/api/f1/drivers/${req.params.racerName}/results.json?limit=270`,
//   headers: {
//     'accept': 'application/json'
//   }
// }

// app.get('/boo', (req, res) => {
// var options = {
//   url: `http://ergast.com/api/f1/drivers/${req.params.racerName}/results.json?limit=500`,
//   headers: {
//     'accept': 'application/json'
//   }
// }
//
// request(options, function (error, response, body) {
//   var chicken = JSON.parse(body)
//   console.log(chicken.MRData.RaceTable)
//   res.status(200).json(chicken.MRData.RaceTable)
//   // do something with body
// })
// })
//



  app.get('/boo', (req, res, next) => {
    var drivers = ['alonso', 'bottas', 'button', 'ericsson', 'grosjean', 'gutierrez', 'hamilton', 'haryanto', 'hulkenberg', 'kvyat', 'kevin_magnussen', 'massa', 'nasr', 'jolyon_palmer', 'perez', 'raikkonen', 'ricciardo', 'rosberg', 'sainz', 'max_verstappen', 'vettel', 'wehrlein']
    //
    // var drivers = ['haryanto', 'nasr']
    drivers.forEach((element) => {
        // console.log(element)
        var options = {
          url: `http://ergast.com/api/f1/drivers/${element}/results.json?limit=1000`,
          headers: {
            'accept': 'application/json'
          }
        }
        // var given_name = []
        // var family_name = []
        // var date_of_birth = []
        // var driverId = []
        // var nationality = []
        // var driver.races = []

        request(options, function (error, response, body) {
          var response = JSON.parse(body)


          // Races iterates up, results does not
          // driver.given_name = response.MRData.RaceTable.Races[0].Results[0].Driver.givenName
          // console.log(driver.givenName)
          let driver = new Driver()
          driver.given_name = response.MRData.RaceTable.Races[0].Results[0].Driver.givenName
          driver.family_name = response.MRData.RaceTable.Races[0].Results[0].Driver.familyName
          driver.date_of_birth = response.MRData.RaceTable.Races[0].Results[0].Driver.date_of_birth
          // driverId.push(race.driverId)
          driver.driverId = response.MRData.RaceTable.Races[0].Results[0].Driver.driverId
          // nationality.push(race.nationality)
          driver.nationality = response.MRData.RaceTable.Races[0].Results[0].Driver.nationality

          response.MRData.RaceTable.Races.forEach((races) => {
            let myrace = new Race()
            let result = new Result()
            // TESTING for Race model
            myrace.Round = races.round
            myrace.Season = races.season
            myrace.raceName = races.raceName
            console.log(races.round)
            console.log(races.season)
            console.log(races.raceName)
            // TESTING for Result model
            result.position = races.Results[0].position
            result.points = races.Results[0].points
            result.positionText = races.Results[0].positionText
            result.grid = races.Results[0].grid
            result.laps = races.Results[0].laps
            result.status = races.Results[0].status
            myrace.results.push(result)
            driver.races.push(myrace)
            // result.save()
            // myrace.save()
          })
          driver.save()
        // do something with body
        })
      })
    res.status(200).json({message: 'success'})
  })


// request(options, function (error, response, body) {
//   var chicken = JSON.parse(body)
//   console.log(chicken.MRData.RaceTable)
//   let driver = new Driver()
//   driver.giveName = chicken.MRData.RaceTable.driverId
//   chicken.MRData.RaceTable.Races.forEach((race)=>{
//     driver.race.push(race)
//   })
//   driver.save()
// res.status(200).json(chicken.MRData.RaceTable)
// do something with body
//   })
// })
//
// var numberofdrivers = drivers.length
//
// for (var i = 0; i < numberofdrivers; i++) {
//   console.log(drivers[i])
// }


// Handle Errors in development
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// Handle errors in production with less information logged
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
module.exports = app
