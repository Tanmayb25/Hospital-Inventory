import React from 'react';
import Table from 'react-bootstrap/Table';
import { getLabEquipment } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';
function labeq() {

  const [searchLabEquipment,setSearchLabEquipment] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [LabEquipment,setLabEquipment] = useState([])

  useEffect(()=>{
    getLabEquipment(searchLabEquipment).then((result)=>{
      setLabEquipment(result)
    }).catch((err)=>{
      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  },[])


  return (
    <div>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Date Added</th>
        </tr>
      </thead>
      <tbody>
        { Array.isArray(LabEquipment) && LabEquipment.map((LabEquipment,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{LabEquipment.name}</td>
          <td>{LabEquipment.type}</td>
          <td>{LabEquipment.quantity}</td>
          <td>{LabEquipment.price}</td>
          <td>{LabEquipment.dateAdded}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
      )
}

export default labeq
