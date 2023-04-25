/**POST http://localhost:8080/api/addSurgicalEquipment */
import mongoose from "mongoose";
import { surgicalEquipmentSchema } from "../models/surgicalEquipments.js";

const SurgicalEquipment = mongoose.model('surgicalEquipment', surgicalEquipmentSchema);

export async function addSurgicalEquipment(req,res){
    try{
    const {catagorie,name,quantity,used,unused} = req.body
    const surgicalEquipmentExist = new Promise((resolve,reject)=>{
        SurgicalEquipment.findOne({name},function(err,surgicalEquipment){
            if(err){
                reject(new Error(err))
            }
            if(surgicalEquipment){
                reject("surgicalEquipment alread exist in database")
            }
            resolve()
        })
    })

    Promise.all([surgicalEquipmentExist])
       .then(()=>{
                const surgicalEquipment = new SurgicalEquipment({
                    catagorie,name,quantity,used,unused
                })
                surgicalEquipment.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).send({ msg: "surgicalEquipment added in database Successfully"})
                    })
                    .catch(error => res.status(500).send({msg:`THERE WAS SOME ERROR: ${error}`}))
        }).catch(error => {
            return res.status(409).send({ msg:`THERE WAS SOME ERROR: ${error}`})
        })
        }catch(err){
        res.status(500).json({ msg:`THERE WAS SOME ERROR: ${error}`});
    }
}
