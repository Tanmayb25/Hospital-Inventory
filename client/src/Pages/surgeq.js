import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {toast, Toaster } from 'react-hot-toast';
import { getSurgicalEquipment } from '../helper/helper';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";
import Popup from 'reactjs-popup';
import { editSurgicalEquipment,deleteSurgicalEquipment } from '../helper/helper';

function surgeq() {
  const [searchSurgicalEquimpent,setSearchSurgicalEquimpent]=useState({
    name:"",
    catagorie:"",
    sortBy:""
  })

  const [surgicalEquipment,setSurgicalEquipment] = useState([])
  const [name,setName] = useState('')
  const [quantityUsed,setQuantityUsed] = useState(0)
  
  
  const fetchSurgicalEquipment = () => {
    getSurgicalEquipment(searchSurgicalEquimpent).then((result)=>{
      setSurgicalEquipment(result)
    }).catch((err)=>{
      toast.error(`${err.msg}`)
    })
  }

  const editQuantity = (_id,initialQuantity,initialUsed)=>{
    const newUsed = parseInt(initialUsed,10) + parseInt(quantityUsed,10)
    if(newUsed>initialQuantity)
    {
      toast.error("There is an error: Used quantity greater than present in stalk")
    }
    else
    {

        if((initialQuantity-newUsed)!=0)
        {
          editSurgicalEquipment(_id,initialQuantity,newUsed).then((msg)=>{
            toast.success("Quantity changed!!")
            fetchSurgicalEquipment()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })  
        }
        else
        {
          deleteSurgicalEquipment(_id).then((msg)=>{
            toast.success(`${msg}`)
            setSearchSurgicalEquimpent({...searchSurgicalEquimpent,name:""})
            setName("")
            fetchSurgicalEquipment()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })
        }    
    }
  }

  useEffect(()=>{
    fetchSurgicalEquipment()
  },[searchSurgicalEquimpent])

  const [filter,setFilter] = useState("")

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <input  value={name} onChange={(e)=>{setName(e.target.value)}} type="search" placeholder="Search text here" ></input>
      <button type='submit' onClick={()=>{setSearchSurgicalEquimpent({...searchSurgicalEquimpent,name:name})}}>Search Surgical-Equimpent</button>
      <button type='submit' onClick={()=>{
       setSearchSurgicalEquimpent({...searchSurgicalEquimpent,name:""})
       setName("")}}>Clear Search</button>
      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchSurgicalEquimpent({...searchSurgicalEquimpent, sortBy:"Unused"})          
        }}>Quantity</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchSurgicalEquimpent({...searchSurgicalEquimpent, sortBy:""})          
        }}>None</Dropdown.Item>
    </DropdownButton>
    <button><Link  to="/SurgicalEqform" ><div>Add surgical-equipment</div></Link></button>
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Catagorie</th>
          <th>Used</th>
          <th>Unused</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(surgicalEquipment) ? (
          surgicalEquipment.map((surgicalEquipment,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{surgicalEquipment.name}</td>
          <td>{surgicalEquipment.catagorie}</td>
          <td>{surgicalEquipment.used}</td>
          <td>{surgicalEquipment.unused}</td>
          <td>
          <Popup trigger=
                {<button> Click to enter used quantity </button>}
                modal nested>
                {
                    close => (
                        <div >
                            <div >
                            <input type='number' onChange={(e)=>{setQuantityUsed(e.target.value)}}/>
                            </div>
                            <div>
                                <button onClick=
                                    {() =>{
                                      editQuantity(surgicalEquipment._id,surgicalEquipment.quantity,surgicalEquipment.used);
                                      setQuantityUsed(0)
                                      close()
                                    } }>
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
          </td>
        </tr>
        ))): (<tr>
          <td>{1}</td>
          <td>{surgicalEquipment.name}</td>
          <td>{surgicalEquipment.catagorie}</td>
          <td>{surgicalEquipment.used}</td>
          <td>{surgicalEquipment.unused}</td>
          <td>
          <Popup trigger=
                {<button> Click to enter used quantity </button>}
                modal nested>
                {
                    close => (
                        <div >
                            <div >
                            <input type='number' onChange={(e)=>{setQuantityUsed(e.target.value)}}/>
                            </div>
                            <div>
                                <button onClick=
                                    {() =>{
                                      editQuantity(surgicalEquipment._id,surgicalEquipment.quantity,surgicalEquipment.used);
                                      setQuantityUsed(0)
                                      close()
                                    } }>
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
          </td>
        </tr>)}
      </tbody>
    </Table>
    </div>
  )
}

export default surgeq
