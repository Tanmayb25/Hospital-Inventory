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
   
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Medicine
      </Button>
      <Formik initialValues={{ name:"", type:"", expiryDate:"", quantity:""}} validationSchema={validateMedForm}>
      {({values,errors,handleChange,handleSubmit})=>
      (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
              type="text"
              placeholder="name of the medicine"
              value={values.name}
              onChange={handleChange}
              />
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type of medicine"
                value={values.type}
                onChange={handleChange}
                autoFocus
              />
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={values.quantity}
                onChange={handleChange}
                autoFocus
              />
              <Form.Label>Expiry date</Form.Label>
              <Form.Control
                type="date"
                placeholder="DDMMYYYY"
                value={values.expiryDate}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="primary" type="submit" onSubmit={handleSubmit(values)} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      )}
      </Formik>
   


         
    </div>
  )
}

export default medform
