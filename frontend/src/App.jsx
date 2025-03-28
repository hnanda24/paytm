import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
function App() {

  return (
    <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/signup" element = {<SignUp/>} />
            <Route path="/login" element = {<Login/>} />
          </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App
