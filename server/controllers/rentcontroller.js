 import {Scooty} from "../models/scootymodel.js"
 import {Rent} from "../models/rentmodel.js"

export const rentcard =async(req, res, next) => {
    try {

        const newRent = new Rent(req.body);
        await newRent.save();

        const scooty = await Scooty.findById({_id: req.body.scooty});
        scooty.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await scooty.save();
        
        res.send('Your Rent is Successfull!')

    } catch(error) {
        return res.status(400).json(error);
    }
}