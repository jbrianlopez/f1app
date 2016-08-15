const mongoose = require('mongoose')
const Race = require('./race').schema

const driverSchema = new mongoose.Schema({
  given_name: String,
  family_name: String,
  date_of_birth: String,
  driverId: String,
  nationality: String,
  races: [Race]
})

driverSchema.methods.sayHello = function () {
  console.log('Hello I am ' + this.given_name + this.family_name + this.date_of_birth)
}

driverSchema.pre('save', function (next) {
  let now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver
// const allCandies = [
//   {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
//   {'id': 2, 'name': 'Pez', 'color': 'Green'},
//   {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
//   {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
// ];
