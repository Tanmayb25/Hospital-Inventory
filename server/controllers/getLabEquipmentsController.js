/**GET http://localhost:8080/api/getLabEquipment */
import mongoose from "mongoose";
import { labEquipmentSchema } from "../models/labEquipments.js";

const LabEquipment = mongoose.model("LabEquipments",labEquipmentSchema)

export async function getLabEquipments(req,res){
    try
    {
        const {name,type,sortBy} = req.query.searchLabEquipment
        if(name==="" && type==="" && sortBy==="")
        {
            
            const labEquipmentfound = new Promise((resolve,reject)=>{
                LabEquipment.find({},function(err,labEquipments){
                    if(err){
                        reject(new Error(`THERE WAS AN ERROR ${err}`))
                    }
                    if(labEquipments){
                        resolve(labEquipments)
                    }
                })
            })

            labEquipmentfound.then((labEquipments)=>{
                res.status(201).send(labEquipments)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(name!="")
        {
           const labEquipmentfound = new Promise((resolve,reject)=>{
                    LabEquipment.findOne({name},function(err,labEquipment) {
                    if(err){
                        reject(new Error(`THERE WAS AN ERROR ${err}`))
                    }
                    if(!labEquipment){
                        reject("THERE IS NO SUCH LAB EQUIPMENT")
                    }
                    resolve(labEquipment)
                })
            })

            labEquipmentfound.then((labEquipment)=>{
                res.status(201).send(labEquipment)
            }).catch((err)=>{
                res.status(500).send(`there was an error: ${err}`)        
            })
        }
        else if(type!="")
        {
            if(sortBy!="")
            {
                const labEquipments = await LabEquipment.find({type});
                let labEquipmentsfound
                if(sortBy==="quantity")
                {
                    // Sort by quantity (highest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => b.quantity - a.quantity);
                    res.status(201).send(labEquipmentsfound);
                }
                else if(sortBy==="price")
                {
                    // Sort by price (highest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => b.price - a.price);
                    res.status(201).send(labEquipmentsfound);
                }
                else if(sortBy==="dateAdded")
                {
                    // Sort by date added (newest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    res.status(201).send(labEquipmentsfound);
                }
            }
            else
            {
                const labEquipmentfound = new Promise((resolve,reject)=>{
                    LabEquipment.find({type},function(err,labEquipment) {
                                if(err){
                                    reject(new Error(`THERE WAS AN ERROR ${err}`))
                                }
                                if(!labEquipment){
                                   reject("THERE ARE NO SUCH LAB EQUIPMENT")
                                }
                                resolve(labEquipment)
                    })
                })
                labEquipmentfound.then((labEquipment)=>{
                    res.status(201).send(labEquipment)
                }).catch((err)=>{
                    res.status(500).send(`there was an error: ${err}`)        
                })
            }     
        }
        else if(sortBy!="")
        {
                const labEquipments = await LabEquipment.find({type});
                let labEquipmentsfound
                if(sortBy==="quantity")
                {
                    // Sort by quantity (highest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => b.quantity - a.quantity);
                    res.status(201).send(labEquipmentsfound);
                }
                else if(sortBy==="price")
                {
                    // Sort by price (highest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => b.price - a.price);
                    res.status(201).send(labEquipmentsfound);
                }
                else if(sortBy==="dateAdded")
                {
                    // Sort by date added (newest first)
                    labEquipmentsfound = labEquipments.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    res.status(201).send(labEquipmentsfound);
                }
        }
    }catch(ERROR){
        res.status(500).send({msg:`there was an error: ${ERROR}`})
    }
}