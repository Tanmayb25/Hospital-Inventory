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
                reject(new Error({error:err}))
            }
            if(surgicalEquipment){
                reject({error:"surgicalEquipment alread exist in database"})
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
                    .catch(error => res.status(500).send({error:"there is an error: "+error}))
        }).catch(error => {
            return res.status(500).send({ error:"there is some error: "+error})
        })
        }catch(err){
        res.status(500).json("ERROR: " + err);
    }
}
