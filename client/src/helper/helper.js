import axios from 'axios';

// get the medicine
export async function getMedicine(searchMedicine){
    try{
        const {data,status} = await axios.get('http://localhost:8080/api/getMedicines',{ params: { searchMedicine } })
        if(status!=201)
        {
            return Promise.reject({msg:"THERE WAS AN ERROR"})
        }
        return Promise.resolve(data)
    }catch(err){
        return Promise.reject(err.response.data)
    }
}

// get the Surgical equipment
export async function getSurgicalEquipment(searchSurgicalEquipment){
    try{
        const {data,status} = await axios.get('http://localhost:8080/api/getSurgicalEquipment',{params:{searchSurgicalEquipment}})
        if(status!=201)
        {
            return Promise.reject({msg:"THERE WAS AN ERROR"})
        }
        return Promise.resolve(data)
    }catch(err){
        return Promise.reject(err.response.data)
    }
}

// get the Lab equipment
export async function getLabEquipment(searchLabEquipment){
    try{
        const {data,status} = await axios.get('http://localhost:8080/api/getLabEquipment',{params:{searchLabEquipment}})
        if(status!=201)
        {
            return Promise.reject({msg:"THERE WAS AN ERROR"})
        }
        return Promise.resolve(data)
    }catch(err){
        return Promise.reject(err.response.data)
    }

}