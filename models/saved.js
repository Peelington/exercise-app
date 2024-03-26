const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savedExerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
}
})

module.exports = mongoose.model("SavedExercise", savedExerciseSchema)