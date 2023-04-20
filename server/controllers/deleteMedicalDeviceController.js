/**DELETE http://localhost:8080/api/deleteMedicalDevice */
import mongoose from "mongoose";
import { medicalDeviceSchema } from "../models/medicalDevice.js";
import { resolve } from "path";
import { rejects } from "assert";

const MedicalDevice = new mongoose.model("MedicalDevice",medicalDeviceSchema);

export async function deleteMedicalDevice(req,res){
    const {_id} = req.body
    try{
        const medicalDevicefound = new Promise((resolve,reject)=>{
            MedicalDevice.findByIdAndDelete(_id,function(err,deletedmedicalDevice){
                if(err){
                    reject(new Error(err))
                }
                if(!deletedmedicalDevice){
                    reject("NO SUCH LAB EQUIPMENT")
                }
                console.log(deletedmedicalDevice);
                resolve("LAB EQUIPMENT DELETED")
            })
        })

        medicalDevicefound.then((result)=>{
            res.status(201).send(result)
        }).catch((err)=>{
            res.status(505).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}