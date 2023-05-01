import React from 'react'
import {  useFormik } from 'formik';
import { addMedicine } from '../helper/helper';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom' 

function medform() {
    const navigate = useNavigate()

    const validateMedForm = Yup.object().shape({
      name: Yup.string()
        .required('ENTER THE NAME'),
      type: Yup.string()
        .required('ENTER THE TYPE'),
      dosageForm: Yup.string()
        .required('ENTER THE DOSAGEFORM'),
      manufacturer: Yup.string()
        .required('ENTER THE MANUFACTURER'),
      expiryDate :  Yup.date()
      .min(new Date(), "INVALID EXPIRY DATE")
      .required("ENTER THE EXPIRY-DATE"),
      storageRequirements: Yup.string()
        .required('ENTER STORAGE-REQUIREMENTS'),
      strength: Yup.string()
        .required('ENTER THE STRENGHT'),
      quantity:Yup.number()
        .required("ENTER THE QUANTITY IN STOCK")
        .positive("INVALID QUANTITY")
        .integer("INVALID QUANTITY"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        type: "",
        dosageForm: "",
        manufacturer: "",
        expiryDate: "",
        storageRequirements: "",
        strength: "",
        quantity: ""
      },
      validationSchema:validateMedForm,
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit: async values => {
       const  addMedicinePromise = addMedicine(values)
        toast.promise(addMedicinePromise, {
          loading: 'Creating...',
          success : <b>Medicine added to database Successfully...!</b>,
          error :(err)=> `${err.msg}`
        });
        addMedicinePromise.then(function(){ navigate('/Medicine')});
      },
    });

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

   <form autoComplete="off" onSubmit={formik.handleSubmit}>
    <input {...formik.getFieldProps('name')} type="text" placeholder='Medicine name*'/>
    {formik.errors.name && <p>{formik.errors.name}</p>}

    <input type="text" {...formik.getFieldProps('type')} placeholder='Medicine type*'/>
    {formik.errors.type && <p>{formik.errors.type}</p>}

    <input type="number" {...formik.getFieldProps('quantity')} placeholder='Medicine quantity available*'/>
    {formik.errors.quantity && <p>{formik.errors.quantity}</p>}

    <input type="text" {...formik.getFieldProps('dosageForm')} placeholder='Dosage-Form*'/>
    {formik.errors.dosageForm && <p>{formik.errors.dosageForm}</p>}

    <input type="text" {...formik.getFieldProps('storageRequirements')} placeholder='storage-requirements for medicine*'/>
    {formik.errors.storageRequirements && <p>{formik.errors.storageRequirements}</p>}

    <input type="Date" {...formik.getFieldProps('expiryDate')} placeholder='Expiry-Date for medicine*'/>
    {formik.errors.expiryDate && <p>{formik.errors.expiryDate}</p>}

    <input type="text" {...formik.getFieldProps('manufacturer')} placeholder='Manufacturer of medicine*'/>
    {formik.errors.manufacturer && <p>{formik.errors.manufacturer}</p>}

    <input type="text" {...formik.getFieldProps('strength')} placeholder='strenght of medicine*' />
    {formik.errors.strength && <p>{formik.errors.strength}</p>}

    <button type='submit'>SAVE MEDICINE DATA</button>
   </form>    
   <button type='click' onClick={()=>{navigate("/Medicine")}}>BACK</button>  
    </div>
  )
}

export default medform
