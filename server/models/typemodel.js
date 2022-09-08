import mongoose from 'mongoose';

const typeSchema =new mongoose.Schema({
    type:{type:String,required:true}
},{
    timestamps:true
})

export const City=mongoose.model('city',typeSchema)