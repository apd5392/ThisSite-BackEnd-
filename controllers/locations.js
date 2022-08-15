const {User, Location}=require('../models')
const {cloudinary} = require('../utils/cloudinary.js')

const getAllLocations = async (req,res)=>{
    try{
        const locations = await Location.findAll({include: [{model: User, as: 'host'}]})
        res.send(locations)
    }catch(error){
        throw error
    }
}

const getLocationById = async (req, res)=>{
    try {
        const id = req.params.id
        const location = await Location.findByPk(id, {include: [{model: User, as: 'host'}]})
        res.send(location)
    } catch (error) {
        throw error
    }
}

const hostLocation = async (req, res)=>{
    try {
        let imgUrls = [];
        const imgStr = req.body.data
        imgStr.map(async(str)=>{
            const uploadedRes = await cloudinary.uploader.upload(str, {
                upload_preset: 'ThisSite'
            })
            const url = uploadedRes.url
            imgUrls.push(url)
        })

        const location = await Location.create({
            images: imgUrls,
            address: req.body.address,
            description: req.body.description,
            price: req.body.price,
            availability: available
        })
        res.send(location)

    } catch (error) {
        throw error
    }
}




module.exports = {
    getAllLocations, getLocationById, hostLocation
}