/**GET http://localhost:8080/api/getMedicines */
import mongoose from "mongoose";
import { medicineSchema } from "../models/medicines.js";

const Medicine = mongoose.model('Medicine', medicineSchema);

export async function getMedicines(req,res){
    try
    {
        const {name,type,sortBy} = req.query.searchMedicine
        if(name==="" && type==="" && sortBy==="")
        {
            
            const medicinefound = new Promise((resolve,reject)=>{
                Medicine.find({},function(err,medicines){
                    if(err){
                        reject(new Error({"ERROR":`THERE WAS AN ERROR ${err}`}))
                    }
                    if(medicines){
                        resolve(medicines)
                    }
                })
            })

            medicinefound.then((medicines)=>{
                res.status(201).send(medicines)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(name!="")
        {
           const medicinefound = new Promise((resolve,reject)=>{
                    Medicine.findOne({name},function(err,medicine) {
                    if(err){
                        reject(new Error({"ERROR":`THERE WAS AN ERROR ${err}`}))
                    }
                    if(!medicine){
                        reject("THERE IS NO SUCH MEDICINE")
                    }
                    resolve(medicine)
                })
            })

            medicinefound.then((medicine)=>{
                res.status(201).send(medicine)
            }).catch((err)=>{
                res.status(500).send({msg:`there was an error: ${err}`})        
            })
        }
        else if(type!="")
        {
            if(sortBy!="")
            {
                const medicines = await Medicine.find({type});
                let medicinefound
                if (sortBy === 'expiryDate') {
                // Sort by expiry date (oldest first)
                medicinefound = medicines.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
                } else if (sortBy === 'quantity') {
                // Sort by quantity (highest first)
                medicinefound = medicines.sort((a, b) => b.quantity - a.quantity);
                }else {
                    // Invalid sort criteria specified
                    return res.status(400).json({ msg: 'Invalid sort criteria' });
                  }
                  res.status(201).send(medicinefound);
            }
            else
            {
                const medicinefound = new Promise((resolve,reject)=>{
                    Medicine.find({type},function(err,medicine) {
                                if(err){
                                    reject(new Error({"ERROR":`THERE WAS AN ERROR ${err}`}))
                                }
                                if(!medicine){
                                   reject("THERE ARE NO SUCH MEDICINES")
                                }
                                resolve(medicine)
                    })
                })
                medicinefound.then((medicine)=>{
                    res.status(201).send(medicine)
                }).catch((err)=>{
                    res.status(500).send({msg:`there was an error: ${err}`})        
                })
            }     
        }
        else if(sortBy!="")
        {
            const medicines = await Medicine.find({});
            let medicinefound
            if (sortBy === 'expiryDate') {
            // Sort by expiry date (oldest first)
            medicinefound = medicines.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
            } else if (sortBy === 'quantity') {
            // Sort by quantity (highest first)
            medicinefound = medicines.sort((a, b) => b.quantity - a.quantity);
            }else{
                // Invalid sort criteria specified
                return res.status(400).json({ msg: 'Invalid sort criteria' });
              }
              res.status(201).send(medicinefound);
        }
    }catch(ERROR){
        res.status(500).send({msg:`there was an error: ${ERROR}`})
    }
}