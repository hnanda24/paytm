import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UpdateUser from "./components/UpdateUser"
import MainContainer from "./components/MainContainer"

function App() {

  return (
    <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/signup" element = {<SignUp/>} />
            <Route path="/" element = {<MainContainer/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/update" element = {<UpdateUser/>} />
          </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App
