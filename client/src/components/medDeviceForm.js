import React from 'react'
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom' 
import { addMedicalDevice } from '../helper/helper';

function MedicalDeviceForm() {
    const navigate = useNavigate()

    const MedicalDeviceForm = Yup.object().shape({
      name: Yup.string()
        .required('ENTER THE NAME'),
      type: Yup.string()
        .required('ENTER THE TYPE'),
      manufacturer: Yup.string()
        .required('ENTER THE MANUFACTURER'),
      dateAdded :  Yup.date()
      .max(new Date(), "INVALID EXPIRY DATE")
      .required("ENTER THE DATE-ADDED"),
      description: Yup.string()
        .required('ENTER DESCRIPTION'),
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
        dateAdded: ""
      },
      validationSchema:MedicalDeviceForm,
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit: async values => {
       const  addMedicalDevicePromise = addMedicalDevice(values)
        toast.promise(addMedicalDevicePromise, {
          loading: 'Creating...',
          success : <b>Medical-Device added to database Successfully...!</b>,
          error :(err)=> `${err.msg}`
        });
        addMedicalDevicePromise.then(function(){ navigate('/Med_dev')});
      },
    });

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

   <form autoComplete="off" onSubmit={formik.handleSubmit}>
    <input {...formik.getFieldProps('name')} type="text" placeholder='Medical-Device name*'/>
    {formik.errors.name && <p>{formik.errors.name}</p>}

    <input type="text" {...formik.getFieldProps('type')} placeholder='Medical-Device type*'/>
    {formik.errors.type && <p>{formik.errors.type}</p>}

    <input type="number" {...formik.getFieldProps('quantity')} placeholder='Medical-Device quantity available*'/>
    {formik.errors.quantity && <p>{formik.errors.quantity}</p>}

    <input type="text" {...formik.getFieldProps('manufacturer')} placeholder='Manufacturer*'/>
    {formik.errors.manufacturer && <p>{formik.errors.manufacturer}</p>}

    <input type="text" {...formik.getFieldProps('description')} placeholder='descripition for Medical-Device*'/>
    {formik.errors.description && <p>{formik.errors.description}</p>}

    <input type="Date" {...formik.getFieldProps('dateAdded')} placeholder='Date-Added for Medical-Device*'/>
    {formik.errors.dateAdded && <p>{formik.errors.dateAdded}</p>}

    <input type="number" {...formik.getFieldProps('price')} placeholder='Medical-Device price*'/>
    {formik.errors.price && <p>{formik.errors.price}</p>}

    <button type='submit'>SAVE Medical-Device DATA</button>
   </form>    
   <button type='click' onClick={()=>{navigate("/Med_dev")}}>BACK</button>  
    </div>
  )
}

export default MedicalDeviceForm
