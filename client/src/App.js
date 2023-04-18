// import Home from "./dbms/src/Home.js";
// import Home from './home';
import Home from './home';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,Route, Routes
} from "react-router-dom";
import Navbar from "./components/Navbar.js"
import About from "./About.js"
import Med from './Pages/med.js';
import Meddev from './Pages/meddev.js';
import Surgeq from './Pages/surgeq.js';
import Labeq from './Pages/labeq.js';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
    <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/Home" element={<Home/>}/>
            <Route exact path="/About" element={<About/>}/>
            <Route exact path="/Medicine" element={<Med/>}/>
            <Route exact path="/Surg_equip" element={<Surgeq/>}/>
            <Route exact path="/lab_equip" element={<Labeq/>}/>
            <Route exact path="/Med_dev" element={<Meddev/>}/>
        </Routes>
        
    </Router>
    </>
  );
}

export default App;
