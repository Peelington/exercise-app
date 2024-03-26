import React, { useContext, useState, useEffect } from "react";
import { ExerciseContext } from "../context/ExerciseContext";
import Exercise from "./Exercise"

export default function Home(props) {

  // console.log(props)
  const { getMyWorkouts, myWorkouts, deleteWorkout } = useContext(ExerciseContext)

  function deleteExercise(exerciseId){
    deleteWorkout(exerciseId)
  }

  const personalWorkouts = myWorkouts.map(workout => {
    return (
      <Exercise
        key={workout.name}
        id={workout._id}
        name={workout.name}
        muscle={workout.muscle}
        difficulty={workout.difficulty}
        instructions={workout.instructions}
        btnFunct={deleteExercise}
        btnText={"Delete Exercise"}
        isDeleting={true}
        
      />
    )
  })

  useEffect(() => {
    getMyWorkouts()
  }, [])
  // console.log(myWorkouts)

  return (
    <div className="home-container main">
      <h1 className="home-text">Current workouts saved</h1>
      <div className="personal-workouts">
      {personalWorkouts}
      </div>
    </div>
  )
}