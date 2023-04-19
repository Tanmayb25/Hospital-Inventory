import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { getMedicine } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';


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
      toast.error('Problem while generating OTP!')
    })
  },[])




  return (
    <div>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {medicines && medicines.map((medicine,index) => (
            <tr key={index}>
          <td>{medicine.name}</td>
          <td>{medicine.type}</td>
          <td>{medicine.dosageForm}</td>
          <td>{medicine.manufacturer}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default med
