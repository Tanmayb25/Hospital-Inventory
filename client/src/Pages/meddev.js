import React from 'react';
import Table from 'react-bootstrap/Table';
import { getMedicalDevice } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";

function meddev() {

  const [searchMedicalDevice,setSearchMedicalDevice] = useState({
    name:"",
    type:"",
    sortBy:""
  })
 
  const [MedicalDevice,setMedicalDevice] = useState([])

  useEffect(()=>{
    fetchMedicalDevice()
  },[searchMedicalDevice])

  const fetchMedicalDevice = () => {
    getMedicalDevice(searchMedicalDevice).then((result)=>{
      setMedicalDevice(result)
    }).catch((err)=>{
      toast.error(`${err.msg}`)
    })
  }

  
  const [filter,setFilter] = useState("")

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchMedicalDevice({...searchMedicalDevice, sortBy:"quantity"})          
        }}>Quantity</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
          setFilter("Date-Added") 
          setSearchMedicalDevice({...searchMedicalDevice, sortBy:"dateAdded"})          
        }}>Date-Added</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("price") 
          setSearchMedicalDevice({...searchMedicalDevice, sortBy:"price"})          
        }}>Price</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchMedicalDevice({...searchMedicalDevice, sortBy:""})          
        }}>None</Dropdown.Item>
    </DropdownButton>
    <Link  to="/MedDeviceform" ><div>Add Medical-Device</div></Link>
    
      <Table striped>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Date Added</th>
          <th>Description</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
      { Array.isArray(MedicalDevice) && MedicalDevice.map((MedicalDevice,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{MedicalDevice.name}</td>
          <td>{MedicalDevice.type}</td>
          <td>{MedicalDevice.quantity}</td>
          <td>{MedicalDevice.price}</td>
          <td>{MedicalDevice.dateAdded}</td>
          <td>{MedicalDevice.description}</td>
          <td>{MedicalDevice.manufacturer}</td>
        </tr>
        ))}
      </tbody>
    </Table>

    </div>
  )
}

export default meddev
