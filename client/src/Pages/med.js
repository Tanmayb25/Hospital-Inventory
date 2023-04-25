import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { getMedicine } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import Medform from '../components/medform';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";

function med() {

  const [searchMedicine,setSearchMedicine] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [medicines,setMedicine] = useState([])

  useEffect(()=>{
    fetchMedicine()
  },[searchMedicine])

  const fetchMedicine = () =>{
    getMedicine(searchMedicine).then((result)=>{
      setMedicine(result)
    }).catch((err)=>{
      toast.error(`THERE WAS AN ERROR ${err.msg}`)
    })
  }

  const [filter,setFilter] = useState("")

  // const submitName = ()=>{
  //   fetchMedicine()
  // }

  return (
    <div>
    <input type="search" placeholder="Search text here"></input>
   
      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchMedicine({...searchMedicine, sortBy:"quantity"})          
        }}>Quantity</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
          setFilter("Expity-Date") 
          setSearchMedicine({...searchMedicine, sortBy:"expiryDate"})          
        }}>Expiry-Date</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchMedicine({...searchMedicine, sortBy:""})          
        }}>None</Dropdown.Item>
    </DropdownButton>
    <Link  to="/Medicineform" ><div>Add medicine</div></Link>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Expiry date</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(medicines) && medicines.map((medicine,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{medicine.name}</td>
          <td>{medicine.type}</td>
          <td>{medicine.quantity}
          <input type="number"/>
          <input type="submit"/>
          </td>
          <td>{medicine.expiryDate}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default med
