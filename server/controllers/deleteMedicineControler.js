/**DELETE http://localhost:8080/api/deleteMedicines */
import mongoose from "mongoose";
import { medicineSchema } from "../models/medicines.js";
import { resolve } from "path";
import { rejects } from "assert";
import { log } from "console";

const Medicine = new mongoose.model("Medicine",medicineSchema);

export async function deleteMedicines(req,res){
    const {_id} = req.query
    try{
        const medicinefound = new Promise((resolve,reject)=>{
            Medicine.findByIdAndDelete(_id,function(err,deletedMedicine){
                if(err){
                    reject(new Error(err))
                }
                if(!deletedMedicine){
                    reject("NO SUCH MEDICINE")
                }
                resolve(deletedMedicine)
            })
        })

        medicinefound.then((result)=>{
            res.status(201).send({msg:`Stalk of ${result.name} is over and its data is deleted form database`})
        }).catch((err)=>{
            res.status(409).send({msg:`There was an error: ${err}`})
        })
    }catch(err){
        res.status(505).send({msg:`There was some error: ${err}`})
    }
    
}