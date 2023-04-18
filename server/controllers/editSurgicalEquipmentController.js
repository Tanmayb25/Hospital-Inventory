/**PUT http://localhost:8080/api/editSurgicalEquipment */
import mongoose from "mongoose";
import { surgicalEquipmentSchema } from "../models/surgicalEquipments.js";
import { resolve } from "path";
import { rejects } from "assert";

const SurgicalEquipment = new mongoose.model("SurgicalEquipment",surgicalEquipmentSchema);

export async function editSurgicalEquipment(req,res){
    const {_id,quantity,used} = req.body
    const unused = quantity - used
    try{
        const surgicalEquipmentfound = new Promise((resolve,reject)=>{
            SurgicalEquipment.findByIdAndUpdate(_id,{quantity:quantity,used:used,unused:unused},{new:true},function(err,upadatedSurgicalEquipment){
                if(err){
                    reject(new Error(err))
                }
                if(!upadatedSurgicalEquipment){
                    reject("Something went wrong")
                }
                resolve(upadatedSurgicalEquipment)
            })
        })

        surgicalEquipmentfound.then((result)=>{
            res.status(201).send({msg:result})
        }).catch((err)=>{
            res.status(505).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}