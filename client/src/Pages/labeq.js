import React from 'react';
import Table from 'react-bootstrap/Table';
import { getLabEquipment } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";

function labeq() {

  const [searchLabEquipment,setSearchLabEquipment] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [LabEquipment,setLabEquipment] = useState([])

  useEffect(()=>{
    fetchLabEquipment()
  },[searchLabEquipment])

  const fetchLabEquipment = () => {
    getLabEquipment(searchLabEquipment).then((result)=>{
      setLabEquipment(result)
    }).catch((err)=>{
      toast.error(`${err.msg}`)
    })
  }
  const [filter,setFilter] = useState("")
  // console.log(searchLabEquipment);
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchLabEquipment({...searchLabEquipment, sortBy:"quantity"})          
        }}>Quantity</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
          setFilter("Date-Added") 
          setSearchLabEquipment({...searchLabEquipment, sortBy:"dateAdded"})          
        }}>Date-Added</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("price") 
          setSearchLabEquipment({...searchLabEquipment, sortBy:"price"})          
        }}>Price</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchLabEquipment({...searchLabEquipment, sortBy:""})          
        }}>None</Dropdown.Item>
    </DropdownButton>
    <Link  to="/LabEqform" ><div>Add lab-equipment</div></Link>
    
    <Table striped>
      <thead>
        <tr>
          <th>Sr.</th>
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
