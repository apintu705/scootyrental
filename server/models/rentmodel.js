import mongoose from 'mongoose'

const rentSchema = new mongoose.Schema({

    scooty : {type : mongoose.Schema.Types.ObjectID , ref:'scooty'},
    user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
    bookedTimeSlots : {
        from : {type : String} ,
        to : {type : String}
    } ,
    totalDays : {type : Number},
    total : {type : Number},
    driverRequired : {type : Boolean}

}, {
    timestamps: true,
    versionKey:false
});

 export const Rent = mongoose.model('Rent', rentSchema);
