import React from 'react'
import { Formik, useFormik } from 'formik';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';

function medform() {
    const [show, setShow] = useState(false);
    
    const validateMedForm = Yup.object({
      name: Yup.string()
        .required('ENTER THE NAME'),
      type: Yup.string()
        .required('ENTER THE TYPE'),
      // dosageForm: Yup.string()
      //   .required('ENTER THE DOSAGEFORM'),
      // manufacturer: Yup.string()
      //   .required('ENTER THE MANUFACTURER'),
      expiryDate :  Yup.date()
      .min(new Date(), "INVALID EXPITY DATE")
      .required("ENTER THE EXPIRY-DATE"),
      // storageRequirements: Yup.string()
      //   .required('ENTER STORAGE-REQUIREMENTS'),
      // strength: Yup.string()
      //   .required('ENTER THE STRENGHT'),
      quantity:Yup.number()
        .required("ENTER THE QUANTITY IN STOCK")
        .positive("INVALID QUANTITY")
        .integer("INVALID QUANTITY"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        type: "",
        // dosageForm: "",
        // manufacturer: "",
        expiryDate: "",
        // storageRequirements: "",
        // strength: "",
        quantity: ""
      },
      validationSchema:{validateMedForm},
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit: values => {
        console.log(values);
        setShow(true);
      },
    });

    const handleSubmit = (values) =>{
      console.log(values);
      setShow(true);
    }

    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false)
      console.log(show);};
   

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
