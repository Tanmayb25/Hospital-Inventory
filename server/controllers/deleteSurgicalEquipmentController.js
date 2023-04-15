/**DELETE http://localhost:8080/api/deleteSurgicalEquipment */
import mongoose from "mongoose";
import { surgicalEquipmentSchema } from "../models/surgicalEquipments.js";
import { resolve } from "path";
import { rejects } from "assert";

const SurgicalEquipment = new mongoose.model("SurgicalEquipment",surgicalEquipmentSchema);

export async function deleteSurgicalEquipment(req,res){
    const {_id} = req.body
    try{
        const surgicalEquipmentfound = new Promise((resolve,reject)=>{
            SurgicalEquipment.findByIdAndDelete(_id,function(err,deletedSurgicalEquipment){
                if(err){
                    reject(new Error(err))
                }
                if(!deletedSurgicalEquipment){
                    reject("NO SUCH SURGICAL EQUIPMENT")
                }
                console.log(deletedSurgicalEquipment);
                resolve("SUGICAL EQUIPMENT DELETED")
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