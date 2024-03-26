import React, { useContext, useState } from 'react'
import { ExerciseContext } from '../context/ExerciseContext'


export default function GoalForm(props) {

  const { addGoal } = useContext(ExerciseContext)

  const initInputs = {
    weight: "",
    waist: "",
    chest: "",
    arms: ""
  }

  const [inputs, setInputs] = useState(initInputs)

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  

  function handleSubmit(e) {
    e.preventDefault()
    addGoal(inputs)
    setInputs(initInputs)
    console.log("button clicked")
  }

  console.log(inputs)

  const { weight, waist, chest, arms } = inputs

  return (
    <div className='goal-form-container'>

      <h2 className='form-display'>Keep track of your progress</h2>

      <form className='goal-form'>
        <div className='goal-input'>
          <h2>Weight</h2>
          <input
            type="text"
            name="weight"
            value={weight}
            onChange={handleChange}
            placeholder="Current Weight" />
        </div>

        <div className='goal-input'>
          <h2>Waist</h2>
          <input
            type="text"
            name="waist"
            value={waist}
            onChange={handleChange}
            placeholder="Waist size" />
        </div>

        <div className='goal-input'>
          <h2>Chest</h2>
          <input
            type="text"
            name="chest"
            value={chest}
            onChange={handleChange}
            placeholder="Chest size" />
        </div>

        <div className='goal-input'>
          <h2>Arm</h2>
          <input
            type="text"
            name="arms"
            value={arms}
            onChange={handleChange}
            placeholder="Arm size" />
        </div>

        <button className="goalBtn" type="submit" onClick={handleSubmit}>Log</button>

      </form>
    </div>
  )
}