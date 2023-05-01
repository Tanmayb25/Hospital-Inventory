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
import Popup from 'reactjs-popup';
import { editLabEquipment,deleteLabEquipment } from '../helper/helper';

function labeq() {

  const [searchLabEquipment,setSearchLabEquipment] = useState({
    name:"",
    type:"",
    sortBy:""
  })

  const [quantity,setQuantity] = useState(0)
  const [LabEquipment,setLabEquipment] = useState([])
  const [name,setName] = useState('')
  useEffect(()=>{
    fetchLabEquipment()
  },[searchLabEquipment])

  const fetchLabEquipment = () => {
    getLabEquipment(searchLabEquipment).then((result)=>{
      setLabEquipment(result)
    }).catch((err)=>{
      toast.error(`${err}`)
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
          editLabEquipment(_id,newQuantity).then((msg)=>{
            toast.success("Quantity changed!!")
          fetchLabEquipment()
          }).catch((err)=>{
            toast.error(`${err.msg}`)
          }) 
        }
        else
        {
          deleteLabEquipment(_id).then((msg)=>{
            toast.success(`${msg}`)

            setSearchLabEquipment({...searchLabEquipment,name:""})
            setName("")
            fetchLabEquipment()

          }).catch((err)=>{
            toast.error(`${err.msg}`)
          })
        } 
    }
  }

  const [filter,setFilter] = useState("")
  // console.log(searchLabEquipment);
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="btns">
        <div className="searchbar">
      <input  value={name} onChange={(e)=>{setName(e.target.value)}} type="search" placeholder="Search text here" ></input>
      </div>
      <button type='submit' onClick={()=>{setSearchLabEquipment({...searchLabEquipment,name:name})}}>Search Lab-Equipment</button>
      <button type='submit' onClick={()=>{
       setSearchLabEquipment({...searchLabEquipment,name:""})
       setName("")}}>Clear Search</button>
       </div>
       <div className="dropdownbtn">
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
    <button><Link  style={{textDecoration:"none",color:"black"}} to="/LabEqform" ><div>Add lab-equipment</div></Link></button>
    </div>
   
        { Array.isArray(LabEquipment) ?(
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
          {LabEquipment.map((LabEquipment,index) => (
            <tr key={index}>
          <td>{index+1}</td>
          <td>{LabEquipment.name}</td>
          <td>{LabEquipment.type}</td>
          <td>{LabEquipment.quantity}</td>
          <td>{LabEquipment.price}</td>
          <td>{LabEquipment.dateAdded}</td>
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
                                      editQuantity(LabEquipment._id,LabEquipment.quantity);
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
        ): (
          <ul>
           <li> Name:{LabEquipment.name}</li>
           <li>Type:{LabEquipment.type}</li>
           <li>Manufacturer:{LabEquipment.manufacturer}</li>
           <li>Description:{LabEquipment.description}</li>
           <li>Price:{LabEquipment.price}</li>
           <li>Model-Number:{LabEquipment.modelNumber}</li>
           <li>Serial-Number:{LabEquipment.serialNumber}</li>
           <li>Warranty:{LabEquipment.warranty}</li>
           <li>Date-Added:{LabEquipment.dateAdded}</li>
           <li>Quantity:{LabEquipment.quantity}</li>
            
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
                                        editQuantity(LabEquipment._id,LabEquipment.quantity);
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

export default labeq
