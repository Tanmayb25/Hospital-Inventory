/**PUT http://localhost:8080/api/editMedicines */
import mongoose from "mongoose";
import { medicineSchema } from "../models/medicines.js";
import { resolve } from "path";
import { rejects } from "assert";

const Medicine = new mongoose.model("Medicine",medicineSchema);

export async function editMedicines(req,res){
    const {_id,quantity} = req.body
    try{
        const medicinefound = new Promise((resolve,reject)=>{
            Medicine.findByIdAndUpdate(_id,{quantity:quantity},{new:true},function(err,upadatedMedicine){
                if(err){
                    reject(new Error(err))
                }
                if(!upadatedMedicine){
                    reject("Something went wrong")
                }
                resolve(upadatedMedicine)
            })
        })

        medicinefound.then((result)=>{
            res.status(201).send({msg:result})
        }).catch((err)=>{
            res.status(505).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}