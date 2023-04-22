import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {toast, Toaster } from 'react-hot-toast';
import { getSurgicalEquipment } from '../helper/helper';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";


function surgeq() {
  const [searchSurgicalEquimpent,setSearchSurgicalEquimpent]=useState({
    name:"",
    catagorie:"",
    sortBy:""
  })

  const [surgicalEquipment,setSurgicalEquipment] = useState([])

  const fetchSurgicalEquipment = () => {
    getSurgicalEquipment(searchSurgicalEquimpent).then((result)=>{
      setSurgicalEquipment(result)
    }).catch((err)=>{
      toast.error(`THERE WAS SOME PROBLEM: ${err.msg}`)
    })
  }

  useEffect(()=>{
    fetchSurgicalEquipment()
  },[searchSurgicalEquimpent])

  const [filter,setFilter] = useState("")

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchSurgicalEquimpent({...searchSurgicalEquimpent, sortBy:"quantity"})          
        }}>Quantity</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchSurgicalEquimpent({...searchSurgicalEquimpent, sortBy:""})          
        }}>None</Dropdown.Item>
    </DropdownButton>
    <Link  to="/SurgicalEqform" ><div>Add surgical-equipment</div></Link>
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
