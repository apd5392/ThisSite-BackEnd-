const {User, Location}=require('../models')


const getAllLocations = async (req,res)=>{
    try{
        const locations = await Location.findAll({include: [{model: User, as: 'host'}]})
        res.send(locations)
    }catch(error){
        throw error
    }
}




module.exports = {
    getAllLocations
}