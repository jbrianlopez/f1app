const mongoose = require('mongoose')
const Result = require('./result').schema

const raceSchema = new mongoose.Schema({
  Season: Number,
  Round: Number,
  raceName: String,
  results: [Result]
})

raceSchema.methods.sayHello = function () {
  console.log('Hello I am ' + this.Season + this.Round + this.raceName)
}

raceSchema.pre('save', function (next) {
  let now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

const Race = mongoose.model('Race', raceSchema)

module.exports = Race
// const allCandies = [
//   {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
//   {'id': 2, 'name': 'Pez', 'color': 'Green'},
//   {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
//   {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
// ];
