import React from "react";

export default function AuthForm(props) {

  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: {
      username,
      password
    }
  } = props
  console.log(errMsg)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username" />
      <input
        type='password'
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password" />
      <button>{btnText}</button>
      <p style={{ color: "white" }}>{errMsg}</p>
    </form>
  )

}