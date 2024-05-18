import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Auth from './pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { TokenAuthContext } from './Context Api/AuthContext'
import { useContext } from 'react'

function App() {

  const {authStatus, setAuthStatus} = useContext(TokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}></Route>
        <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}></Route>
        <Route path='/log' element={<Login />}></Route>
        <Route path='/reg' element={<Reg />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
