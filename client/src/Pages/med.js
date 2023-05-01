import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { getMedicine } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

// import Medform from '../components/medform';
import "./med.css"

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  Link
} from "react-router-dom";
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
  const [quantity,setQuantity] = useState(0)
  const [medicines,setMedicine] = useState([])

  useEffect(()=>{
      fetchMedicine()
      fetchMedicine()
  },[searchMedicine])



  const fetchMedicine = () =>{
    getMedicine(searchMedicine).then((result)=>{
      setMedicine(result)
    }).catch((err)=>{
      toast.error(`${err.msg}`)
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
            setSearchMedicine({...searchMedicine,name:""})
            setName("")
            fetchMedicine()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })
        }    
    }
  }

  //const [filter,setFilter] = useState("")

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
          setSearchMedicine({...searchMedicine, sortBy:"quantity"}) 
        }}>Quantity</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
          setFilter("Expity-Date") 
          setSearchMedicine({...searchMedicine,name:"", sortBy:"expiryDate"}) 
          setSearchMedicine({...searchMedicine,name:"", sortBy:"expiryDate"}) 
        }}>Expiry-Date</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setFilter("") 
          setSearchMedicine({...searchMedicine,name:"", sortBy:""})  
          setSearchMedicine({...searchMedicine,name:"", sortBy:""})  
        }}>None</Dropdown.Item>
    </DropdownButton>

    <button><Link  style={mystyle} to="/Medicineform" >Add medicine</Link></button>

    </div>



        {Array.isArray(medicines) ? (
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
         {medicines.map((medicine,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{medicine.name}</td>
          <td>{medicine.type}</td>
          <td>{medicine.quantity}
          {/* <input type="number" value={medicine.quantity} onChange={(e)=>console.log(e.target.value)}/>
          <input type="submit" /> */}
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
                                      setQuantity(0);
                                      close()
                                    } }>
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            
          {/* {(popupText===true) && (<td>
            <input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/>
          </td>)} */}
          {/* <Popup trigger={<button> Trigger</button>} position="left center">
            <div><input type='number' onChange={(e)=>{setQuantity(e.target.value)}}/></div>
          </Popup> */}
          

        </tr>))}
          </tbody>
         </Table>
        ) : (
          <span>
            Name:{medicines.name}
            Type:{medicines.type}
            Dosage-Form:{medicines.dosageForm}
            Manufacturer:{medicines.manufacturer}
            exiryDate:{medicines.expiryDate}
            Storage-Requirements:{medicines.storageRequirements}
            Strength:{medicines.strength}
            Quantity:{medicines.quantity}

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
                                      setQuantity(0);
                                      close()
                                    } }>
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            </span>
          
        )}
      
    </div>
  )
}

export default med
