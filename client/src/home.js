import React from 'react';
import Card from './components/card.js';
import {
  Link
} from "react-router-dom";


function Home() {
    return (
    <>
      
      <Link  to="/Medicine" ><Card title={"Medicine"}></Card></Link>
      
      <Link  to="/Surg_equip" ><Card title={"Surgical Equipments"}></Card></Link>
      
      <Link  to="/lab_equip" ><Card title={"Lab Equipments"}></Card></Link>
     
      <Link  to="/Med_dev" ><Card title={"Medical devices"}></Card></Link>
      
      
    </>
      
      
    );
  }


  export default Home;