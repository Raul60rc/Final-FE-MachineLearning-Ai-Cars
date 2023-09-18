import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Cookies } from "./Pages/Cookies";
import { Privacy } from "./Pages/Privacy";
import { LegalWarning } from "./Pages/Legal";
import { Conditions } from "./Pages/Conditions";
import React, { useState } from 'react';
import NewCar from "./Pages/NewCar";
import Formulario from "./Pages/exampleform";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = () => {
      setLoggedIn(true);
    };
  
    const handleLogout = () => {
      setLoggedIn(false);
    };
  
    return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="legalwarning" element={<LegalWarning />} />
        <Route path="conditions" element={<Conditions />} />
        <Route path="newcar" element={<NewCar />} />
        <Route path="models" element={loggedIn ? <Models onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route path="exampleform" element={<Formulario />} />
      </Routes>
    </>
  );
}

export default App;
