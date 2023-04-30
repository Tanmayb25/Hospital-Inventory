/**DELETE http://localhost:8080/api/deleteLabEquipment */
import mongoose from "mongoose";
import { labEquipmentSchema } from "../models/labEquipments.js";
import { resolve } from "path";
import { rejects } from "assert";

const LabEquipment = new mongoose.model("LabEquipment",labEquipmentSchema);

export async function deleteLabEquipment(req,res){
    const {_id} = req.query
    try{
        const labEquipmentfound = new Promise((resolve,reject)=>{
            LabEquipment.findByIdAndDelete(_id,function(err,deletedlabEquipment){
                if(err){
                    reject(new Error(err))
                }
                if(!deletedlabEquipment){
                    reject("NO SUCH LAB EQUIPMENT")
                }
                console.log(deletedlabEquipment);
                resolve(deletedlabEquipment)
            })
        })

        labEquipmentfound.then((result)=>{
            res.status(201).send({msg:`Stalk of ${result.name} is over and it is deleted from database `})
        }).catch((err)=>{
            res.status(409).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}