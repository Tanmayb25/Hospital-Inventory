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
                reject(new Error({error:err}))
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
                    .catch(error => res.status(500).send({error:"there is an error: "+error}))
        }).catch(error => {
            console.log(error);
            return res.status(500).send({ error:"there is some error: "+error})
            
        })
        }catch(err){
            console.log(err);
        res.status(400).json("ERROR: " + err);
    }
}
