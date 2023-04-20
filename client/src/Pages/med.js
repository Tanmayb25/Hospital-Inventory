import React, { useEffect }, { useCallback, useEffect } from 'react'
import Table from 'react-bootstrap/Table';



import { useState } from 'react';
import { getMedicine } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import Medform from '../components/medform';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function med() {

  const [searchMedicine,setSearchMedicine] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [medicines,setMedicine] = useState([])

  useEffect(()=>{
    getMedicine(searchMedicine).then((result)=>{
      setMedicine(result)
    }).catch((err)=>{
      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  },[])

console.log(medicines);



  const [searchMedicine,setSearchMedicine] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [medicines,setMedicine] = useState([])

  useEffect(()=>{
    getMedicine(searchMedicine).then((result)=>{
      setMedicine(result)
    }).catch((err)=>{

      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  },[])

console.log(medicines);



  return (
    <div>
    <FloatingLabel controlId="floatingPassword" label="Search">
        <Form.Control type="text" placeholder="Search" />
      </FloatingLabel>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item onClick={()=>{console.log("hello");}}>Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
      <Medform/>
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
          <td>{medicine.quantity}</td>
          <td>{medicine.expiryDate}</td>
        </tr>
        ))}
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default med
