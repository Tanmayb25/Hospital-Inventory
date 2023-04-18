import mongoose from "mongoose";

export  const surgicalEquipmentSchema = new mongoose.Schema({
    catagorie: {
        type : String,
        required : true,
    },
    name: {
        type : String,
        required : true,
    },
    quantity:{
        type : Number,
        required : true,
    },
    used:{
        type : Number,
        required : true,
    },
    unused:{
        type : Number,
        required : true,
    }
});

