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
        console.log(data);
        return Promise.resolve(data)
    }catch(err){
        return Promise.reject(err.response.data)
    }
}

// get the Medical Device
export async function getMedicalDevice(searchMedicalDevice){
    
    try{
        const {data,status} = await axios.get('http://localhost:8080/api/getMedicalDevice',{params:{searchMedicalDevice}})
        if(status!=201)
        {
            return Promise.reject({msg:"THERE WAS AN ERROR"})
        }
        console.log(data);
        return Promise.resolve(data)
    }catch(err){
        return Promise.reject(err.response.data)
    }
}

//add medicine
export async function addMedicine(values){
    try {
        const {data:{msg},status} = await axios.post("http://localhost:8080/api/addMedicines",values)
        if(status===201)
        {
            return  Promise.resolve(msg)
        }
    } catch (error) {
        return  Promise.reject(error.response.data)
    }
}

//add surgicalEquipment
export async function addSurgicalEquipment(values){
    try {
        const {data:{msg},status} = await axios.post("http://localhost:8080/api/addSurgicalEquipment",values)
        if(status===201)
        {
            return  Promise.resolve(msg)
        }
    } catch (error) {
        return  Promise.reject(error.response.data)
    }
}

//add labEquipment
export async function addLabEquipment(values){
    try {
        const {data:{msg},status} = await axios.post("http://localhost:8080/api/addLabEquipment",values)
        if(status===201)
        {
            return  Promise.resolve(msg)
        }
    } catch (error) {
        return  Promise.reject(error.response.data)
    }
}

//add MedicalDevice
export async function addMedicalDevice(values){
    try {
        const {data:{msg},status} = await axios.post("http://localhost:8080/api/addMedicalDevice",values)
        if(status===201)
        {
            return  Promise.resolve(msg)
        }
    } catch (error) {
        return  Promise.reject(error.response.data)
    }
}
