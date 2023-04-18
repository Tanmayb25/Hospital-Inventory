/**PUT http://localhost:8080/api/editLabEquipment */
import mongoose from "mongoose";
import { labEquipmentSchema } from "../models/labEquipments.js";
import { resolve } from "path";
import { rejects } from "assert";

const LabEquipment = new mongoose.model("LabEquipment",labEquipmentSchema);

export async function editLabEquipment(req,res){
    const {_id,quantity} = req.body
    try{
        const labEquipmentfound = new Promise((resolve,reject)=>{
            LabEquipment.findByIdAndUpdate(_id,{quantity:quantity},{new:true},function(err,upadatedLabEquipment){
                if(err){
                    reject(new Error(err))
                }
                if(!upadatedLabEquipment){
                    reject("NO SUCH LAB EQUIPMENT")
                }
                resolve(upadatedLabEquipment)
            })
        })

        labEquipmentfound.then((result)=>{
            res.status(201).send({msg:result})
        }).catch((err)=>{
            res.status(505).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}