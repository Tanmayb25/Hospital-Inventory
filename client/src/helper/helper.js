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
        const unused = values.quantity - values.used
        values = {...values,unused:unused}
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

//edit medicine
export async function editMedicine(_id,quantity){
    try{
        const  value = {_id,quantity}
        const {data:{msg}} = await axios.put('http://localhost:8080/api/editMedicines',value)
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}

//edit lab-equipment
export async function editLabEquipment(_id,quantity){
    try{
        const  value = {_id,quantity}
        const {data:{msg}} = await axios.put('http://localhost:8080/api/editLabEquipment',value)
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}

//edit SurgicalEquipment
export async function editSurgicalEquipment(_id,quantity,used){
    try{
        const  value = {_id,quantity,used}
        const {data:{msg}} = await axios.put('http://localhost:8080/api/editSurgicalEquipment',value)
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}

//delete medicine
export async function deleteMedicine(_id){
    try{
        const {data:{msg}} = await axios.delete('http://localhost:8080/api/deleteMedicines',{params:{_id:_id}})
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}

//delete LabEquipment
export async function deleteLabEquipment(_id){
    try{
        const {data:{msg}} = await axios.delete('http://localhost:8080/api/deleteLabEquipment',{params:{_id:_id}})
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}

//delete SurgicalEquipmen
export async function deleteSurgicalEquipment(_id){
    try{
        const {data:{msg}} = await axios.delete('http://localhost:8080/api/deleteSurgicalEquipment',{params:{_id:_id}})
        return Promise.resolve(msg)
    }catch(err)
    {
        return Promise.reject(err.response.data)
    }
}
