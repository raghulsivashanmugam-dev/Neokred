import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './Component/Pages/Mainpage'
import LoginPage from './Component/Pages/Loginpage'

function App() {
  const [count, setCount] = useState(0)

  const [token, setToken] = useState()
  return (
    <>
      {sessionStorage.getItem("token") == "yes" ? <MainPage /> : <LoginPage />}
    </>
  )
}

export default App
