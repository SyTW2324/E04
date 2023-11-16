import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Header } from './components/Header.tsx'
import { LoginForm } from './components/LoginForm.tsx'




function App() {
  const [main, setMain] = useState(false)


  return (
    <>
      <Header />
      { main ? <LoginForm /> : <></>}
      <button onClick={() => setMain(!main)}>Login</button>
    </>
  )
}

export default App
