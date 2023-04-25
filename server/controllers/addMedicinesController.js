/**POST http://localhost:8080/api/addMedicines */
import mongoose from "mongoose";
import { medicineSchema } from "../models/medicines.js";

const Medicine = mongoose.model('Medicine', medicineSchema);

export async function addMedicines(req,res){
    try{
    const {name,type,dosageForm,manufacturer,expiryDate,storageRequirements,strength,quantity} = req.body
    const medicineExist = new Promise((resolve,reject)=>{
        Medicine.findOne({name},function(err,medicine){
            if(err){
                reject(new Error(err))
            }
            if(medicine){
                reject("medicine alread exist in database")
            }
            resolve()
        })
    })

    Promise.all([medicineExist])
       .then(()=>{
                const medicine = new Medicine({
                    name,type,dosageForm,manufacturer,expiryDate,storageRequirements,strength,quantity
                })
                medicine.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).send({ msg: "Medicine added in database Successfully"})
                    })
                    .catch(error => res.status(500).send({msg:`THERE WAS SOME ERR: ${error}`}))
        }).catch(error => {
            console.log(error);
            return res.status(409).send({msg:`THERE WAS SOME ERR: ${error}`})
            
        })
        }catch(err){
            console.log(err);
        res.status(500).json({msg:`THERE WAS SOME ERR: ${err}`});
    }
}
