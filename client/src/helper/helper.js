import axios from 'axios';

// get the medicine
export async function getMedicine(searchMedicine){
     const {data,status} = await axios.get('http://localhost:8080/api/getMedicines',{ params: { searchMedicine } })
    if(status!=201)
    {
        return Promise.reject("THERE WAS AN ERROR")
    }
    return Promise.resolve(data)

}