/**GET http://localhost:8080/api/getsurgicalEquipment */
import mongoose from "mongoose";
import { surgicalEquipmentSchema } from "../models/surgicalEquipments.js";

const SurgicalEquipment = mongoose.model("SurgicalEquipments",surgicalEquipmentSchema)

export async function getSurgicalEquipment(req,res){
    try
    {
        const {name,catagorie,sortBy} = req.query.searchSurgicalEquipment
        console.log(name,catagorie,sortBy);
        if(name==="" && catagorie==="" && sortBy==="")
        {
            
            const surgicalEquipmentfound = new Promise((resolve,reject)=>{
                SurgicalEquipment.find({},function(err,surgicalEquipments){
                    if(err){
                        reject(new Error(err))
                    }
                    if(surgicalEquipments){
                        resolve(surgicalEquipments)
                    }
                })
            })

            surgicalEquipmentfound.then((surgicalEquipments)=>{
                res.status(201).send(surgicalEquipments)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(name!="")
        {
           const surgicalEquipmentfound = new Promise((resolve,reject)=>{
                    SurgicalEquipment.findOne({name},function(err,surgicalEquipment) {
                    if(err){
                        reject(new Error(err))
                    }
                    if(!surgicalEquipment){
                        reject("THERE IS NO SUCH SURGICAL EQUIPMENT")
                    }
                    resolve(surgicalEquipment)
                })
            })

            surgicalEquipmentfound.then((surgicalEquipment)=>{
                res.status(201).send(surgicalEquipment)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(catagorie!="")
        {
            if(sortBy!="")
            {
                const surgicalEquipments = await SurgicalEquipment.find({catagorie});
                let surgicalEquipmentsfound
                // Sort by quantity (highest first)
                surgicalEquipmentsfound = surgicalEquipments.sort((a, b) => b.quantity - a.quantity);
                res.status(201).send(surgicalEquipmentsfound);
            }
            else
            {
                const surgicalEquipmentfound = new Promise((resolve,reject)=>{
                    SurgicalEquipment.find({catagorie},function(err,surgicalEquipment) {
                                if(err){
                                    reject(new Error(err))
                                }
                                if(!surgicalEquipment){
                                   reject("THERE ARE NO SUCH SURGICAL EQUIPMENT")
                                }
                                resolve(surgicalEquipment)
                    })
                })
                surgicalEquipmentfound.then((surgicalEquipment)=>{
                    res.status(201).send(surgicalEquipment)
                }).catch((err)=>{
                    res.status(500).send({msg:`there was an error: ${err}`})        
                })
            }     
        }
        else if(sortBy!="")
        {
            const surgicalEquipments = await SurgicalEquipment.find({});
                let surgicalEquipmentsfound
                // Sort by quantity (highest first)
                surgicalEquipmentsfound = surgicalEquipments.sort((a, b) => b.quantity - a.quantity);
                res.status(201).send(surgicalEquipmentsfound);
        }
    }catch(ERROR){
        res.status(500).send({msg:`there was an error: ${ERROR}`})
    }
}