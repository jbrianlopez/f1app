const mongoose = require('mongoose')

const constructorSchema = new mongoose.Schema({
  name: String,
  nationality: String
})

constructorSchema.methods.sayHello = function () {
  console.log('Hello I am ' + this.name + this.nationalty)
}

constructorSchema.pre('save', function (next) {
  let now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

const Constructor = mongoose.model('Constructor', constructorSchema)

module.exports = Constructor
// const allCandies = [
//   {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
//   {'id': 2, 'name': 'Pez', 'color': 'Green'},
//   {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
//   {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
// ];
