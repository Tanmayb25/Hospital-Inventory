import React from 'react'
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom' 
import { addLabEquipment } from '../helper/helper';
import "./labeqform.css"

function LabEquipmentForm() {
    const navigate = useNavigate()

    const LabEquipmentForm = Yup.object().shape({
      name: Yup.string()
        .required('ENTER THE NAME'),
      type: Yup.string()
        .required('ENTER THE TYPE'),
      manufacturer: Yup.string()
        .required('ENTER THE MANUFACTURER'),
      dateAdded :  Yup.date()
      .max(new Date(), "INVALID EXPITY DATE")
      .required("ENTER THE DATE-ADDED"),
      description: Yup.string()
        .required('ENTER DESCRIPTION'),
      modelNumber: Yup.string()
        .required('ENTER THE MODEL-NUMBER'),
      serialNumber: Yup.string()
        .required('ENTER THE SERIAL-NUMBER'),
      warranty: Yup.string()
        .required('ENTER THE WARRANTY'),
      quantity:Yup.number()
        .required("ENTER THE QUANTITY IN STOCK")
        .positive("INVALID QUANTITY")
        .integer("INVALID QUANTITY"),
      price:Yup.number()
        .required("ENTER THE PRICE IN STOCK")
        .positive("INVALID PRICE")
        .integer("INVALID PRICE"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        quantity: "",
        type: "",
        manufacturer: "",
        description: "",
        price: "",
        modelNumber: "",
        serialNumber: "",
        warranty: "",
        dateAdded: ""
      },
      validationSchema:LabEquipmentForm,
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit: async values => {
       const  addLabEquipmentPromise = addLabEquipment(values)
        toast.promise(addLabEquipmentPromise, {
          loading: 'Creating...',
          success : <b>Lab-Equipment added to database Successfully...!</b>,
          error :(err)=> `${err.msg}`
        });
        addLabEquipmentPromise.then(function(){ navigate('/lab_equip')});
      },
    });

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

   <form autoComplete="off" onSubmit={formik.handleSubmit}>
    <input {...formik.getFieldProps('name')} type="text" placeholder='Lab-Equipment name*'/>
    {formik.errors.name && <p>{formik.errors.name}</p>}

    <input type="text" {...formik.getFieldProps('type')} placeholder='Lab-Equipment type*'/>
    {formik.errors.type && <p>{formik.errors.type}</p>}

    <input type="number" {...formik.getFieldProps('quantity')} placeholder='Lab-Equipment quantity available*'/>
    {formik.errors.quantity && <p>{formik.errors.quantity}</p>}

    <input type="text" {...formik.getFieldProps('manufacturer')} placeholder='Manufacturer*'/>
    {formik.errors.manufacturer && <p>{formik.errors.manufacturer}</p>}

    <input type="text" {...formik.getFieldProps('description')} placeholder='descripition for Lab-Equipment*'/>
    {formik.errors.description && <p>{formik.errors.description}</p>}

    <input type="Date" {...formik.getFieldProps('dateAdded')} placeholder='Date-Added for Lab-Equipment*'/>
    {formik.errors.dateAdded && <p>{formik.errors.dateAdded}</p>}

    <input type="text" {...formik.getFieldProps('modelNumber')} placeholder='Model-Number of Lab-Equipment*' />
    {formik.errors.modelNumber && <p>{formik.errors.modelNumber}</p>}

    <input type="text" {...formik.getFieldProps('serialNumber')} placeholder='Serial-Number of Lab-Equipment*' />
    {formik.errors.serialNumber && <p>{formik.errors.serialNumber}</p>}

    <input type="text" {...formik.getFieldProps('warranty')} placeholder='Warranty of Lab-Equipment*' />
    {formik.errors.warranty && <p>{formik.errors.warranty}</p>}

    <input type="number" {...formik.getFieldProps('price')} placeholder='Lab-Equipment price available*'/>
    {formik.errors.price && <p>{formik.errors.price}</p>}

    <button type='submit'>SAVE Lab-Equipment DATA</button>
   </form>    
   <button type='click' onClick={()=>{navigate("/lab_equip")}}>BACK</button>  
    </div>
  )
}

export default LabEquipmentForm
