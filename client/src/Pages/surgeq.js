import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {toast, Toaster } from 'react-hot-toast';
import { getSurgicalEquipment } from '../helper/helper';
import Surgicaleqform from '../components/surgicaleqform';



function surgeq() {
  const [searchSurgicalEquimpent,setSearchSurgicalEquimpent]=useState({
    name:"",
    catagorie:"",
    sortBy:""
  })

  const [surgicalEquipment,setSurgicalEquipment] = useState([])

  useEffect(()=>{
    getSurgicalEquipment(searchSurgicalEquimpent).then((result)=>{
      setSurgicalEquipment(result)
    }).catch((err)=>{
      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  },[])


  return (
    <div>
<Surgicaleqform/>
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Catagorie</th>
          <th>Quantity</th>
          <th>Used</th>
          <th>Unused</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(surgicalEquipment) && surgicalEquipment.map((surgicalEquipment,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{surgicalEquipment.name}</td>
          <td>{surgicalEquipment.catagorie}</td>
          <td>{surgicalEquipment.quantity}</td>
          <td>{surgicalEquipment.used}</td>
          <td>{surgicalEquipment.unused}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default surgeq
