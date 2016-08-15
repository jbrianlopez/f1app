const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  position: Number,
  points: Number,
  positionText: String,
  grid: Number,
  laps: String,
  status: String
})

resultSchema.methods.sayHello = function () {
  console.log('Hello I am ' + this.position + this.points + this.grid)
}

resultSchema.pre('save', function (next) {
  let now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
// const allCandies = [
//   {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
//   {'id': 2, 'name': 'Pez', 'color': 'Green'},
//   {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
//   {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
// ];
