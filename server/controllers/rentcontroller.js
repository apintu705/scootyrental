 import {Car} from "../models/carmodel.js"
 import {Rent} from "../models/rentmodel.js"

export const rentcard =async(req, res, next) => {
    try {

        const newRent = new Rent(req.body);
        await newRent.save();

        const car = await Car.findById({_id: req.body.car});
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save();
        
        res.send('Your Rent is Successfull!')

    } catch(error) {
        return res.status(400).json(error);
    }
}