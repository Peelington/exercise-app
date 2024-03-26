import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Goals from './components/Goals'
import Workouts from './components/Workouts'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { ExerciseContext } from './context/ExerciseContext'
import './App.css'

function App() {

  const { token, logout, goal } = useContext(ExerciseContext)
  

  return (
    <div className='app'>
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Auth />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute token={token} redirectTo="/">
            <Home />
          </ProtectedRoute>}
        />
        <Route
          path="/goals"
          element={<ProtectedRoute token={token} redirectTo="/">
            <Goals goal={goal} />
          </ProtectedRoute>
          }
        />
        <Route
          path="/workouts"
          element={<ProtectedRoute token={token} redirectTo="/">
            <Workouts />
          </ProtectedRoute>
          }
        />
      </Routes>


    </div>
  )
}

export default App
