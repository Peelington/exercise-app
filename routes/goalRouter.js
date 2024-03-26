const express = require('express')
const goalRouter = express.Router()
const Goal = require("../models/goal.js")

//get goal
goalRouter.get("/user", (req, res, next) => {
  // console.log(req.auth)
  Goal.find({ user: req.auth._id }, (err, goal) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(goal)
  })
});

// goalRouter.get('/user', async(req,res, next) => {
//   try {
//     const goals = await Goal.find({user: req.auth._id})
//     return res.status(200).send(goals)
//   } catch (err) {
//     res.status(500)
//     return next(err)
//   }
// })

goalRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newGoal = new Goal(req.body)
  console.log(newGoal)
  newGoal.save((err, savedGoal) => {
    if(err){
      res.status(500)
      next(err)
    }
    console.log(savedGoal)
    return res.status(201).send(savedGoal)
  })
})

module.exports = goalRouter