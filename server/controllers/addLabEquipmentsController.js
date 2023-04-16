/**POST http://localhost:8080/api/addLabEquipment */
import mongoose from "mongoose";
import { labEquipmentSchema } from "../models/labEquipments.js";

const LabEquipment = mongoose.model('LabEquipment', labEquipmentSchema);

export async function addLabEquipment(req,res){
    try{
    const {name,quantity,type,manufacturer,description,price,modelNumber,serialNumber,warranty,dateAdded} = req.body
    const labEquipmentExist = new Promise((resolve,reject)=>{
        LabEquipment.findOne({name},function(err,labEquipment){
            if(err){
                reject(new Error({error:err}))
            }
            if(labEquipment){
                reject("labEquipment alread exist in database")
            }
            resolve()
        })
    })

    Promise.all([labEquipmentExist])
       .then(()=>{
                const labEquipment = new LabEquipment({
                    name,quantity,type,manufacturer,description,price,modelNumber,serialNumber,warranty,dateAdded
                })
                labEquipment.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).send({ msg: "Lab Equipment added in database Successfully"})
                    })
                    .catch(error => res.status(500).send({error:"there is an error: "+error}))
        }).catch(error => {
            return res.status(500).send({ error:"there is some error: "+error})
        })
        }catch(err){
        res.status(500).json("ERROR: " + err);
    }
}
