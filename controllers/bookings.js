const {User, Booking, Location} = require("../models")

const createBooking = async (req, res)=>{
    try {
        const {user_id, location_id,start_date, end_date}=req.body
        let available 
        const bookings =  await Booking.findAll({where: {location_Id: location_id}})

        if(bookings){
           for(let i=0; i<bookings.length; i++){
            if(start_date < bookings[i].start_date && end_date > bookings[i].end_date){
                available = true 
            }else{
                available = false
                break
        }
           }
        }else{available = true}
        
        if(available){
            res.send(available)
            // const booking = await Booking.create({
            //     user_Id: user_id,
            //     location_Id: location_id,
            //     start_date: start_date,
            //     end_date: end_date       
            // })

            // res.send(booking)
        }else{
            res.send({message:`location unavailable`})
        }
    } catch (error) {
        throw error
    }
}





module.exports = {
    createBooking
}