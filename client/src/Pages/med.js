import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { getMedicine } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

// import Medform from '../components/medform';
import "./med.css"

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import Popup from 'reactjs-popup';
import { editMedicine,deleteMedicine } from '../helper/helper';

function med() {

  const [searchMedicine,setSearchMedicine] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [filter,setFilter] = useState("")
  const [name,setName] = useState('')
  const [quantity,setQuantity] = useState('')
  const [medicines,setMedicine] = useState([])

  useEffect(()=>{
      fetchMedicine()
  },[searchMedicine])


  const fetchMedicine = () =>{
    getMedicine(searchMedicine).then((result)=>{
      setMedicine(result)
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
          editMedicine(_id,newQuantity).then((msg)=>{
            toast.success("Quantity changed!!")
            fetchMedicine()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })  
        }
        else
        {
          deleteMedicine(_id).then((msg)=>{
            toast.success(`${msg}`)
            fetchMedicine()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })
        }    
    }
  }

  //const [filter,setFilter] = useState("")

  // const submitName = ()=>{
  //   fetchMedicine()
  // }
  
const mystyle={
  margin:"10px",
  textDecoration:"none"
};
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <input  value={name} onChange={(e)=>{setName(e.target.value)}} type="search" placeholder="Search text here" ></input>
      <button type='submit' onClick={()=>{setSearchMedicine({...searchMedicine,name:name})}}>Search medicine</button>
      <button type='submit' onClick={()=>{
       setSearchMedicine({...searchMedicine,name:""})
       setName("")}}>Clear Search</button>
      
    
    <div>

      <DropdownButton id="dropdown-basic-button" title={(filter!="")?(`${filter}`):("Filter-by")}>
      <Dropdown.Item  onClick={()=>{
          setFilter("quantity") 
          setSearchMedicine({...searchMedicine, sortBy:"quantity"}) 
        }}>Quantity</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
          setFilter("Expity-Date") 
          setSearchMedicine({...searchMedicine,name:"", sortBy:"expiryDate"}) 
        }}>Expiry-Date</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchMedicine({...searchMedicine,name:"", sortBy:""})  
        }}>None</Dropdown.Item>
    </DropdownButton>

    <button><Link  style={mystyle} to="/Medicineform" >Add medicine</Link></button>
    </div>

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
        {Array.isArray(medicines) ? (
          medicines.map((medicine,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{medicine.name}</td>
          <td>{medicine.type}</td>
          <td>{medicine.quantity}
          {/* <input type="number" value={medicine.quantity} onChange={(e)=>console.log(e.target.value)}/>
          <input type="submit" /> */}
          <input type="number" value={medicine.quantity} onChange={(e)=>console.log(e.target.value)} className="qtyadd"/>
          <input type="submit" className="qtychange"/>
          </td>
          <td>{medicine.expiryDate}</td>
          {/* {(popupText===true) && (<td>
            <input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/>
          </td>)} */}
          {/* <Popup trigger={<button> Trigger</button>} position="left center">
            <div><input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/></div>
          </Popup> */}
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
                                      editQuantity(medicine._id,medicine.quantity);
                                      close()
                                    } }>
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            
        </tr>
        ))) : (
          <tr>
          <td>{1}</td>
          <td>{medicines.name}</td>
          <td>{medicines.type}</td>
          <td>{medicines.quantity}
          <input type="number" value={medicines.quantity} onChange={(e)=>console.log(e.target.value)}/>
          <input type="submit" />
          </td>
          <td>{medicines.expiryDate}</td>
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
                                      editQuantity(medicines._id,medicines.quantity);
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
        )}
      </tbody>
    </Table>
    </div>
  )
}

export default med
