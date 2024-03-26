import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  const { logout } = props

  return (
    <div className='navbar'>
      <Link to="/home" className='navlink'>Home</Link>
      <Link to="/goals" className='navlink'>Goals</Link>
      <Link to="/workouts" className='navlink'>Workouts</Link>
      <button onClick={logout}>logout</button>
    </div>
  )
}