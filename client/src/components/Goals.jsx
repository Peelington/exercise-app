import React, { useContext, useEffect } from 'react'
import GoalForm from './GoalForm'
import SingleGoal from './SingleGoal'
import { ExerciseContext } from '../context/ExerciseContext'

export default function Goals(props) {
  const { getGoal } = useContext(ExerciseContext)

  const { goal } = props

  // console.log(props)
  
  const goals = goal.map(goal => <SingleGoal {...goal} />)

  useEffect(() => {
    getGoal()
  }, [])

  return (
    <div className='main goal-container'>
      <GoalForm />
      {goals}
    </div>

  )
}