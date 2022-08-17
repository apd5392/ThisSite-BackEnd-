const { User, Location, Comment } = require('../models')
const { cloudinary } = require('../utils/cloudinary.js')

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [
        { model: User, as: 'host' },
        { model: Comment, include: [{ model: User, as: 'commentCreator' }] }
      ]
    })
    res.send(locations)
  } catch (error) {
    throw error
  }
}

const getLocationById = async (req, res) => {
  try {
    const id = req.params.id
    const location = await Location.findByPk(id, {
      include: [
        { model: User, as: 'host' },
        { model: Comment, include: [{ model: User, as: 'commentCreator' }] }
      ]
    })
    res.send(location)
  } catch (error) {
    throw error
  }
}

const getUserHostedLocations = async (req, res) => {
  try {
    const { userId } = req.params
    const locations = await Location.findAll({
      include: [{ model: User, as: 'host' }],
      where: { user_Id: userId }
    })
    res.send(locations)
  } catch (error) {
    throw error
  }
}

const filterLocations = async (req, res)=>{
try {
    const {cityandstate, start_date, end_date} = req.body
  
    if(cityandstate === ""){
      const locations = await Location.findAll({include: [{
        model: User,
        as: "bookedLocation",
        where: {
          start_date: {[Op.notBetween]:[start_date, end_date]},
          end_date: {[Op.notBetween]:[start_date, end_date]}}
      }]})
    }
  res.send(location)
} catch (error) {
  throw error
}
}

const hostLocation = async (req, res) => {
  const imgUrls = []
  try {
    const { images, user_Id, address, description, price } = req.body

    images.forEach(async (img) => {
      const uploadedRes = await cloudinary.uploader.upload(img, {
        upload_preset: 'ThisSite'
      })
      const url = await uploadedRes.url
      imgUrls.push(url)
      console.log(imgUrls)
    })

    setTimeout(async () => {
      const location = await Location.create({
        user_Id: user_Id,
        images: imgUrls,
        address: address,
        description: description,
        price: price,
        availability: 'available'
      })
      res.send(location)
    }, 1500)
  } catch (error) {
    console.log(error.message)
  }
}

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params
    Location.update(req.body, { where: { id: id }, returning: true })

    res.send(location)
  } catch (error) {
    throw error
  }
}

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params
    await Location.destroy({ where: { id: id } })
    res.send({message: `Location with id ${id} has been deleted`})
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllLocations,
  getLocationById,
  hostLocation,
  updateLocation,
  deleteLocation,
  getUserHostedLocations,
  filterLocations,
}
