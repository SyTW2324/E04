import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Header } from './components/Header.tsx'
import { LoginForm } from './components/LoginForm.tsx'
import { RegisterForm } from './components/RegisterForm.tsx'
import { ListRecipes } from './components/ListRecipes.tsx'
import { UserInfo } from './components/UserInfo.tsx'




function App() {
  const [main, setMain] = useState(false)


  return (
    <>
      <Header />
      { main ? <RegisterForm /> : <UserInfo/>}
      <button onClick={() => setMain(!main)}>Register</button>
    </>
  )
}

export default App
