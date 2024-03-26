import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { ExerciseContext } from "../context/ExerciseContext";
import Exercise from "./Exercise";

export default function Workouts() {

  const { addExercise } = useContext(ExerciseContext)

  const [muscleGroup, setMuscleGroup] = useState("")
  const [exerciseChosen, setExerciseChosen] = useState([])

  const exercise_array = [
    "Select Exercise",
    "Abdominals",
    "Abductors",
    "Adductors",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Lower_back",
    "Middle_back",
    "Neck",
    "Quadriceps",
    "Traps",
    "Triceps"
  ]

  const exerciseList = exercise_array.map(exercise => {
    return (
      <option key={exercise} value={exercise.toLowerCase()}>{exercise}</option>
    )
  })

  function handleChange(e) {
    setMuscleGroup(e.target.value)
  }
  // console.log(muscleGroup)

  // function addNew() {
  //   addExercise({
  //     name: name,
  //     muscle: muscle,
  //     difficulty: difficulty,
  //     instructions: instructions,
  //     equipment: equipment,
  //     type: type
  //   })
  // }

  axios.defaults.headers.common["x-api-key"] = "cLZn1xxZAL8XFNXNCjSodQ==BbvQac5011FSGNbd"

  function getExercises() {
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleGroup}`
    axios.get(url)
      .then(res => setExerciseChosen(res.data))
      .catch(err => console.log(err.response.data.errMsg))

  }


  function savedExercise(data) {
    addExercise(data)
  }


  const exerciseComponent = exerciseChosen.map(workout => {
    return (
      <Exercise
        key={workout.name}
        name={workout.name}
        muscle={workout.muscle}
        difficulty={workout.difficulty}
        instructions={workout.instructions}
        equipment={workout.equipment}
        type={workout.type}
        btnFunct={savedExercise}
        btnText={"Save Exercise"}
        isDeleting={false}
      />
    )
  })

  // console.log(exerciseComponent, "exercise")
  // console.log(exerciseChosen, "chosen exercise")
  return (

    <div className="workout-container">
      <h1 className="workout-text">Workouts</h1>
      <select onChange={handleChange}>{exerciseList}</select>
      <button onClick={getExercises}>Pick Exercise</button>
        <div className="exercise-container">
        {exerciseComponent}
      </div>

    </div>
  )
}