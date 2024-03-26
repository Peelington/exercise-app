import React from "react";
import moment from "moment"
export default function SingleGoal(props){

  const {waist, chest, arms, weight, dateTracked} = props

  const formattedDate = moment(dateTracked).format("MMM Do YY")
  // console.log(props)
  return (
    <div className='goal-posted'>
        <h2 className='goal-listed'>Date Logged: {formattedDate}</h2>
        <h2 className='goal-listed'>Weight: {weight} lbs</h2>
        <h2 className='goal-listed'>Waist: {waist} inches</h2>
        <h2 className='goal-listed'>Chest: {chest} inches</h2>
        <h2 className='goal-listed'>Arm: {arms} inches</h2>
      </div>
  )
}