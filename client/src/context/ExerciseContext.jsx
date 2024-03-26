import React, { useState, useContext, useEffect, createContext } from "react";
import axios from 'axios'


export const ExerciseContext = createContext()

export default function ExerciseProvider(props) {

  const userAxios = axios.create()


  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  })


  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    goal: [],
    myWorkouts: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)
  // const [goal, setGoal] = useState([])
  // const [myWorkouts, setMyWorkouts] = useState([])


  function signup(credentials) {
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token

        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  };

  function login(credentials) {
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getMyWorkouts()
        getGoal()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token,
          // myWorkouts: [],
          // goal: []

        }))
      })
      .catch(err => handleAuthErr(err.response?.data.errMsg))
  };

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      myWorkouts: [],
      goal: []

    })
  };

  function handleAuthErr(errMsg) {
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr() {
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }

  function addGoal(newGoal) {
    userAxios.post("/api/goal", newGoal)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          goal: [...prevState.goal, res.data]
        }))
      })
      .catch(err => console.log(err))
  }

  function getGoal() {
    userAxios.get('/api/goal/user')
      .then(res => setUserState(prevState => {

        return {
          ...prevState,
          goal: res.data
        }
      }))
      .catch(err => console.log(err))
  }

  function addExercise(newExercise) {
    userAxios.post("/api/home", newExercise)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          myWorkouts: [...prevState.myWorkouts, res.data]
        }))
      })
      .catch(err => console.log(err))
  }

  function getMyWorkouts() {
    userAxios.get("/api/home/workouts")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          myWorkouts: res.data
        }))
      })
      .catch(err => console.log(err))
  }

  function deleteWorkout(exerciseId) {
    userAxios.delete(`/api/home/${exerciseId}`)
      .then(() => {
        setUserState(prevState => ({
          ...prevState,
          myWorkouts: prevState.myWorkouts.filter(exercise => exercise._id !== exerciseId)
        }));
      })
      .catch(err => console.log(err.response));
  }



  return (
    <ExerciseContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthErr,
        addGoal,
        getMyWorkouts,
        // myWorkouts,
        getGoal,
        addExercise,
        deleteWorkout
      }}>
      {props.children}
    </ExerciseContext.Provider>
  )
}
