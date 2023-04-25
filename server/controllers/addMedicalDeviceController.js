/**POST http://localhost:8080/api/addMedicalDevice */
import mongoose from "mongoose";
import { medicalDeviceSchema } from "../models/medicalDevice.js";

const MedicalDevice = mongoose.model('MedicalDevice', medicalDeviceSchema);

export async function addMedicalDevice(req,res){
    try{
    const {name,
      type,
      description,
      manufacturer,
      quantity,
      price,
      dateAdded} = req.body
    const medicalDeviceExist = new Promise((resolve,reject)=>{
        MedicalDevice.findOne({name},function(err,medicalDevice){
            if(err){
                reject(new Error(err))
            }
            if(medicalDevice){
                reject("medicalDevice alread exist in database")
            }
            resolve()
        })
    })

    Promise.all([medicalDeviceExist])
       .then(()=>{
                const medicalDevice = new MedicalDevice({
                    name,type,description,manufacturer,quantity,price,dateAdded
                })
                medicalDevice.save()
                    .then(result => {
                        res.status(201).send({ msg: "medicalDevice added in database Successfully"})
                    })
                    .catch(error => res.status(500).send({msg:`there is an error: ${error}`}))
        }).catch(error => {
            return res.status(500).send({msg:`there is an error: ${error}`})
        })
        }catch(err){
        res.status(500).json({msg:`there is an error: ${err}`});
    }
}
