import React from 'react';
import "./home.css";
import Medicon from "./png/medicine.png";
import Meddevicon from "./png/heart.png";
import Surgeicon from "./png/surgical-instrument.png";
import labicon from "./png/test-tubes.png";
import Card from './components/card.js';
import {
  Link
} from "react-router-dom";



function Home() {
    return (
    <>
    
      <div className="Mainpage">
      <Link  style={{textDecoration: 'none' }} to="/Medicine" ><Card title={"Medicine"} imgsource={Medicon}></Card></Link>
      
      <Link  style={{textDecoration: 'none'}} to="/Surg_equip" ><Card title={"Surgical Equipments"} imgsource={Surgeicon}></Card></Link>
      
      <Link  style={{textDecoration: 'none'}} to="/lab_equip" ><Card title={"Lab Equipments"} imgsource={labicon}></Card></Link>
     
      <Link  style={{textDecoration: 'none'}} to="/Med_dev" ><Card title={"Medical devices"} imgsource={Meddevicon}></Card></Link>
      </div>
      
    </>
      
      
    );
  }


  export default Home;