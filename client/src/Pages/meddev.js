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
import Popup from 'reactjs-popup';
import { deleteMedicalDevices,editMedicalDevices } from '../helper/helper';

function meddev() {

  const [searchMedicalDevice,setSearchMedicalDevice] = useState({
    name:"",
    type:"",
    sortBy:""
  })
 
  const [MedicalDevice,setMedicalDevice] = useState([])
  const [name,setName] = useState('')
  const [quantity,setQuantity] = useState(0)
  
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

  const editQuantity = (_id,initialQuantity)=>{
    if(quantity>initialQuantity)
    {
      toast.error("There is an error: Used quantity greater than present in stalk")
    }
    else
    {
        const newQuantity = initialQuantity - quantity
        if(newQuantity!=0)
        {
          editMedicalDevices(_id,newQuantity).then((msg)=>{
            toast.success("Quantity changed!!")
          fetchMedicalDevice()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          }) 
        }
        else
        {
          deleteMedicalDevices(_id).then((msg)=>{
            toast.success(`${msg}`)
            setSearchMedicalDevice({...searchMedicalDevice,name:""})
            setName("")
            fetchMedicalDevice()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })
        } 
    }
  }

  
  const [filter,setFilter] = useState("")

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="btns">
      <div className="searchbar">
      <input  value={name} onChange={(e)=>{setName(e.target.value)}} type="search" placeholder="Search text here" ></input>
      </div>
      <button type='submit' onClick={()=>{setSearchMedicalDevice({...searchMedicalDevice,name:name})}}>Search Medical-Device</button>
      <button type='submit' onClick={()=>{
       setSearchMedicalDevice({...searchMedicalDevice,name:""})
       setName("")}}>Clear Search</button>
        </div>
        <div className="dropdownbtn">
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
    <button><Link  style={{textDecoration:"none",color:"black"}} to="/MedDeviceform" ><div>Add Medical-Device</div></Link></button>
    </div>
      
      { Array.isArray(MedicalDevice) ? (
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
        {MedicalDevice.map((MedicalDevice,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{MedicalDevice.name}</td>
          <td>{MedicalDevice.type}</td>
          <td>{MedicalDevice.quantity}</td>
          <td>{MedicalDevice.price}</td>
          <td>{MedicalDevice.dateAdded}</td>
          <td>
          <Popup trigger=
                {<button> Click to enter used quantity </button>}
                modal nested>
                {
                    close => (
                        <div >
                            <div >
                            <input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/>
                            </div>
                            <div>
                                <button onClick=
                                    {() =>{
                                      editQuantity(MedicalDevice._id,MedicalDevice.quantity);
                                      setQuantity(0)
                                      close()
                                    } }>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
          </td>
        </tr>))}
        </tbody>
        </Table>
        ) : (  
          <ul>
          <li>Name:{MedicalDevice.name}</li>
          <li>Type:{MedicalDevice.type}</li>
          <li>Description:{MedicalDevice.description}</li>
          <li>Manufacturer:{MedicalDevice.manufacturer}</li>
          <li>Price:{MedicalDevice.price}</li>
          <li>Date-Added:{MedicalDevice.dateAdded}</li>
          <li>Quantity:{MedicalDevice.quantity}</li>
          <Popup trigger=
                {<button> Click to enter used quantity </button>}
                modal nested>
                {
                    close => (
                        <div >
                            <div >
                            <input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/>
                            </div>
                            <div>
                                <button onClick=
                                    {() =>{
                                      editQuantity(MedicalDevice._id,MedicalDevice.quantity);
                                      setQuantity(0)
                                      close()
                                    } }>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            </ul>
        )}
    </div>
  )
}

export default meddev
