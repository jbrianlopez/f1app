const Driver = require('../models/driver')

function showAllDrivers (req, res, err) {
  Driver.find({}, function (err, drivers) {
    res.status(200).json({drivers: drivers})
  })
}

function showOneDriver (req, res) {
  const driver = req.params.driverId
  // const authToken = req.get('auth_token')
  // const userParams = new User(req.body)
  Driver.find({driverId: driver}, function (err, driver) {
    if (err) return res.status(401).json({error: 'No driver ID'})
    Driver.find({driver}, function (err, resource) {
      if (err) return res.status(401).json({error: 'Error finding resource'})
      res.status(200).json({drivers: driver})
    })
  })
}

//
// function listWorks (req, res) {
//   Work.find((err, worksArray) => {
//     if (err) return res.status(404).json({message: 'Work not found'})
//
//     // create a simplified list to return selective info
//     const simplifiedList = []
//     for (let i = 0; i < worksArray.length; ++i) {
//       simplifiedList.push({company: worksArray[i].company, role: worksArray[i].role, duty: worksArray[i].duty})
//     }
//     res.status(200).json({works: worksArray})
//   })
// }
// function showWorks (req, res) {
//   Work.findById({_id: req.params.id}, (err, work) => {
//     if (err) return res.status(404).json({message: 'Work not found'})
//     // else
//
//     res.status(200).json(work)
//   })
// }
//
// module.exports = {
//   index: listWorks,
//   show: showWorks
// }


module.exports = {
  showAllDrivers: showAllDrivers,
  showOneDriver: showOneDriver
}
