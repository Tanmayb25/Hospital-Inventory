import React from 'react'
import { Formik, useFormik } from 'formik';
import { useState } from 'react';

function medform() {

  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }
  return (
    <div>
   <form onSubmit={handleSubmit}>
    <label>Name
    <input type="text"/>
    </label>
    <label>type
    <input type="text"/>
    </label>
    <label>Quantity
    <input type="number"/>
    </label>
    <label>Dosage Form
    <input type="text"/>
    </label>
    <label>Storage Requirements
    <input type="text"/>
    </label>
    <label>Expiry Date
    <input type="Date"/>
    </label>
    <label>Manufacturer
    <input type="text"/>
    </label>
    <input type="submit" />
   </form>
  
      

         
    </div>
  )
}

export default medform
