import { useState } from 'react'
import './App.css'

import { Header } from './components/Header.tsx'
import { LoginForm } from './components/LoginForm.tsx'
import { RegisterForm } from './components/RegisterForm.tsx'
import { ListRecipes } from './components/ListRecipes.tsx'
import { UserInfo } from './components/UserInfo.tsx'




function App() {
  const [main, setMain] = useState(true)
  const [user, setUser] = useState({})


  return (
    <>
      <Header />
      { main ? <LoginForm setUser={setUser} /> : <UserInfo user={user} />}

      {/* { main ? <LoginForm /> : <UserInfo/>} */}
      <button onClick={() => setMain(!main)}>Register</button>
    </>
  )
}

export default App
