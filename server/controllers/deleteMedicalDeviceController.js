/**DELETE http://localhost:8080/api/deleteMedicalDevice */
import mongoose from "mongoose";
import { medicalDeviceSchema } from "../models/medicalDevice.js";


const MedicalDevice = new mongoose.model("MedicalDevice",medicalDeviceSchema);

export async function deleteMedicalDevice(req,res){
    const {_id} = req.query
    try{
        const medicalDevicefound = new Promise((resolve,reject)=>{
            MedicalDevice.findByIdAndDelete(_id,function(err,deletedmedicalDevice){
                if(err){
                    reject(new Error(err))
                }
                if(!deletedmedicalDevice){
                    reject("NO SUCH MEDICAL DEVICE")
                }
                resolve(`Stalk of ${deleteMedicalDevice} is over and it has been deleted from database`)
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