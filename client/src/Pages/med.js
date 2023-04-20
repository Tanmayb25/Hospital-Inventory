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

      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  },[])

console.log(medicines);



  return (
    <div>
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
      </tbody>
    </Table>
    </div>
  )
}

export default med
