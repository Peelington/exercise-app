import React, { useContext, useState } from "react";
import { ExerciseContext } from '../context/ExerciseContext'

export default function Exercise(props) {

  const { name, muscle, difficulty, equipment, type, instructions, btnFunct, btnText, isDeleting, id } = props
  const { addExercise } = useContext(ExerciseContext)
  // console.log("workout", workout)

  const [exerciseData, setExerciseData] = useState({
    name: name,
    muscle: muscle,
    difficulty: difficulty,
    instructions: instructions,
    equipment: equipment,
    type: type
  })

  function handleClick(){
    if(!isDeleting){
      btnFunct(exerciseData)
    }
    if(isDeleting){
      btnFunct(id)
    }
  }

  return (
    <div className="exercise">

      <h1 className="exercise-name">Exercise name: {name}</h1>
      <p className="exercise-muscle">Muscle: {muscle}</p>
      <p className="exercise-difficulty">Difficulty: {difficulty}</p>
      <p className="exercise-instructions" >Instructions: {instructions}</p>
      <button onClick={handleClick}> {btnText} </button>
    </div>
  )
}