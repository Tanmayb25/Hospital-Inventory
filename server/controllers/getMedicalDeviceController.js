/**GET http://localhost:8080/api/getMedicalDevice */
import mongoose from "mongoose";
import { medicalDeviceSchema } from "../models/medicalDevice.js";
const MedicalDevice = mongoose.model("MedicalDevices",medicalDeviceSchema)

export async function getMedicalDevice(req,res){
    try
    {
        const {name,type,sortBy} = req.body
        if(name==="" && type==="" && sortBy==="")
        {
            
            const medicalDevicefound = new Promise((resolve,reject)=>{
                MedicalDevice.find({},function(err,medicalDevices){
                    if(err){
                        reject(new Error(`THERE WAS AN ERROR ${err}`))
                    }
                    if(medicalDevices){
                        resolve(medicalDevices)
                    }
                })
            })

            medicalDevicefound.then((medicalDevice)=>{
                res.status(201).send(medicalDevice)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(name!="")
        {
           const medicalDevicefound = new Promise((resolve,reject)=>{
                    MedicalDevice.findOne({name},function(err,medicalDevice) {
                    if(err){
                        reject(new Error(`THERE WAS AN ERROR ${err}`))
                    }
                    if(!medicalDevice){
                        reject("THERE IS NO SUCH LAB EQUIPMENT")
                    }
                    resolve(medicalDevice)
                })
            })

            medicalDevicefound.then((medicalDevice)=>{
                res.status(201).send(medicalDevice)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(type!="")
        {
            if(sortBy!="")
            {
                const medicalDevice = await MedicalDevice.find({type});
                let medicalDevicefound
                if(sortBy==="quantity")
                {
                    // Sort by quantity (highest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => b.quantity - a.quantity);
                    res.status(201).send(medicalDevicefound);
                }
                else if(sortBy==="price")
                {
                    // Sort by price (highest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => b.price - a.price);
                    res.status(201).send(medicalDevicefound);
                }
                else if(sortBy==="dateAdded")
                {
                    // Sort by date added (newest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    res.status(201).send(medicalDevicefound);
                }
            }
            else
            {
                const medicalDevicefound = new Promise((resolve,reject)=>{
                    MedicalDevice.find({type},function(err,medicalDevice) {
                                if(err){
                                    reject(new Error(`THERE WAS AN ERROR ${err}`))
                                }
                                if(!medicalDevice){
                                   reject("THERE ARE NO SUCH LAB EQUIPMENT")
                                }
                                resolve(medicalDevice)
                    })
                })
                medicalDevicefound.then((medicalDevice)=>{
                    res.status(201).send(medicalDevice)
                }).catch((err)=>{
                    res.status(500).send({msg:`there was an error: ${err}`})        
                })
            }     
        }
        else if(sortBy!="")
        {
                const medicalDevice = await MedicalDevice.find({type});
                let medicalDevicefound
                if(sortBy==="quantity")
                {
                    // Sort by quantity (highest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => b.quantity - a.quantity);
                    res.status(201).send(medicalDevicefound);
                }
                else if(sortBy==="price")
                {
                    // Sort by price (highest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => b.price - a.price);
                    res.status(201).send(medicalDevicefound);
                }
                else if(sortBy==="dateAdded")
                {
                    // Sort by date added (newest first)
                    medicalDevicefound = medicalDevice.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    res.status(201).send(medicalDevicefound);
                }
        }
    }catch(ERROR){
        res.status(500).send({msg:`there was an error: ${ERROR}`})
    }
}