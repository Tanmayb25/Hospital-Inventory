/**PUT http://localhost:8080/api/editMedicalDevice */
import mongoose from "mongoose";
import { medicalDeviceSchema } from "../models/medicalDevice.js";

import { resolve } from "path";
import { rejects } from "assert";

const MedicalDevice = new mongoose.model("MedicalDevice",medicalDeviceSchema);

export async function editMedicalDevice(req,res){
    const {_id,quantity} = req.body
    try{
        const medicalDevicefound = new Promise((resolve,reject)=>{
            MedicalDevice.findByIdAndUpdate(_id,{quantity:quantity},{new:true},function(err,upadatedmedicalDevice){
                if(err){
                    reject(new Error(err))
                }
                if(!upadatedmedicalDevice){
                    reject("NO SUCH LAB EQUIPMENT")
                }
                resolve(upadatedmedicalDevice)
            })
        })

        medicalDevicefound.then((result)=>{
            res.status(201).send(result)
        }).catch((err)=>{
            res.status(404).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}