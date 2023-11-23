import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  )
}

const Login = () => {
  return (
    <div>
      <LoginForm />
      <a href="/">Home</a>
      <a href="/register">Register</a>
    </div>
  )
}


const Register = () => {
  return (
    <div>
      <RegisterForm />
      <a href="/">Home</a>
      <a href="/login">Login</a>
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);



function App() {
  const [user, setUser] = useState({})


  return (
    <>
      <Header />
      <RouterProvider router={router} />

    </>
  )
}

export default App



// function App() {
//   const [main, setMain] = useState(true)
//   const [user, setUser] = useState({})


//   return (
//     <>
//       <Header />
//       { main ? <LoginForm setUser={setUser} /> : <UserInfo user={user} />}
//       <RegisterForm/>

//       {/* { main ? <LoginForm /> : <UserInfo/>} */}
//       <button onClick={() => setMain(!main)}>Register</button>
//     </>
//   )
// }

// export default App
