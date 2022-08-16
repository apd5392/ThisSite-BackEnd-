const {User, Location, Comment}=require('../models')
const {cloudinary} = require('../utils/cloudinary.js')

const getAllLocations = async (req,res)=>{
    try{
        const locations = await Location.findAll({include: [{model: User, as: 'host'},{model: Comment, include:[{model: User, as: 'comment-creator'}]}]})
        res.send(locations)
    }catch(error){
        throw error
    }
}

const getLocationById = async (req, res)=>{
    try {
        const id = req.params.id
        const location = await Location.findByPk(id, {include: [{model: User, as: 'host'},{model: Comment, include:[{model: User, as: 'comment-creator'}]}]})
        res.send(location)
    } catch (error) {
        throw error
    }
}

const getUserHostedLocations = async(req, res)=>{
    try {
        const {userId} = req.params
        const locations = await Location.findAll({include: [{model: User, as: 'host'}],where: {user_Id: userId}})
        res.send(locations)
    } catch (error) {
        throw error
    }
}

const hostLocation = async (req, res)=>{
    try {
        let imgUrls = [];
        const {images, userId, address, description, price} = req.body

        for(let i = 0; i < images.length; i++){
            const uploadedRes = await cloudinary.uploader.upload(images[i], {
                upload_preset: 'ThisSite'
            })
            imgUrls.push(uploadedRes.url)
        }

        const location = await Location.create({
            user_Id: userId,
            images: imgUrls,
            address: address,
            description: description,
            price: price,
            availability: "available"
        })

        res.send(location)

    } catch (error) {
        throw error
    }
}

const updateLocation = async (req, res)=>{
    try {
    const {id} = req.params
        Location.update(req.body, {where:{id: id}, returning: true})

        res.send(location)
        
    } catch (error) {
        throw error
    }
}

const deleteLocation = async (req, res)=>{
    try {
        const {id} = req.params
        await Location.destroy({where: {id: id}})
    } catch (error) {
        throw error
    }
}


module.exports = {
    getAllLocations, getLocationById, hostLocation, updateLocation, deleteLocation, getUserHostedLocations
}