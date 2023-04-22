import React from 'react'
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom'
import { addSurgicalEquipment } from '../helper/helper'; 

function SurgicalEquipmentForm() {
    const navigate = useNavigate()

    const validateSurgicalEqForm = Yup.object().shape({
      name: Yup.string()
        .required('ENTER THE NAME'),
      catagorie: Yup.string()
        .required('ENTER THE CATAGORIE'),
      quantity:Yup.number()
        .required("ENTER THE QUANTITY IN STOCK")
        .positive("INVALID QUANTITY")
        .integer("INVALID QUANTITY"),
      used:Yup.number()
        .required("ENTER THE USED QUANTITY")
        .positive("INVALID USED AMOUNT")
        .integer("INVALID USED AMOUNT"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        catagorie: "",
        quantity: "",
        used:"",
        unused:""
      },
      validationSchema:validateSurgicalEqForm,
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit: async values => {
       const  addSurgicalEquipmentPromise = addSurgicalEquipment(values)
        toast.promise(addSurgicalEquipmentPromise, {
          loading: 'Creating...',
          success : <b>Surgical-Equipment added to database Successfully...!</b>,
          error :(err)=> ` ${err.msg}`
        });
        addSurgicalEquipmentPromise.then(function(){ navigate('/Surg_equip')});
      },
    });

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

   <form autoComplete="off" onSubmit={formik.handleSubmit}>
    <input {...formik.getFieldProps('name')} type="text" placeholder='Surgical-equipment name*'/>
    {formik.errors.name && <p>{formik.errors.name}</p>}

    <input type="text" {...formik.getFieldProps('catagorie')} placeholder='Surgical-equipment catagorie*'/>
    {formik.errors.catagorie && <p>{formik.errors.catagorie}</p>}

    <input type="number" {...formik.getFieldProps('quantity')} placeholder='Surgical-equipment quantity available*'/>
    {formik.errors.quantity && <p>{formik.errors.quantity}</p>}

    <input type="number" {...formik.getFieldProps('used')} placeholder='Used*'/>
    {formik.errors.used && <p>{formik.errors.used}</p>}

    <input type="number"  value={formik.values.quantity-formik.values.used} {...formik.getFieldProps('unused')} />
    {formik.errors.unused && <p>{formik.errors.unused}</p>}

    <button type='submit'>SAVE SURGICAL-EQUIPMENT DATA</button>
   </form>    
   <button type='click' onClick={()=>{navigate("/Surg_equip")}}>BACK</button>  
    </div>
  )
}

export default SurgicalEquipmentForm
