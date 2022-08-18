const { User, Location, Comment, Booking, Sequelize } = require('../models')
const { cloudinary } = require('../utils/cloudinary.js')
const { Op } = require('sequelize')
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

const filterLocations = async (req, res) => {
  console.log(req.body)
  try {
    const { cityandstate, start_date, end_date } = req.body
    let unavailable = [],
      startBetween,
      endBetween,
      locations

    const bookings = await Booking.findAll()

    setTimeout(async () => {
      for (let i = 0; i < bookings.length; i++) {
        if (
          start_date >= bookings[i].start_date &&
          start_date <= bookings[i].end_date
        )
          startBetween = true
        else if (
          start_date <= bookings[i].start_date &&
          end_date >= bookings[i].start_date
        )
          startBetween = true
        else startBetween = false

        if (
          end_date <= bookings[i].end_date &&
          end_date >= bookings[i].start_date
        )
          endBetween = true
        if (
          end_date >= bookings[i].end_date &&
          start_date <= bookings[i].end_date
        )
          endBetween = true
        else endBetween = false

        if (startBetween || endBetween) {
          unavailable.push(bookings[i].location_Id)
        }
      }


      if(cityandstate === ""){
        if(unavailable.length>0){
        locations = await Location.findAll({
          include: [
            { model: User, as: 'host' },
            { model: Comment, include: [{ model: User, as: 'commentCreator' }] }],

          where: {
            [Op.not]: {
              id: unavailable
            }
          }
        })

}else{
    locations = await Location.findAll({
      include: [
        { model: User, as: 'host' },
        { model: Comment, include: [{ model: User, as: 'commentCreator' }] }]
})}
}else{
        if(unavailable>0){
          locations = await Location.findAll({
            include: [
              { model: User, as: 'host' },
              { model: Comment, include: [{ model: User, as: 'commentCreator' }] }],
          where: {[Op.and]:
            {[Op.not]: {
              id: unavailable
            },
          address: {[Op.iLike]: `%${cityandstate}%`}}

          }
        })
      }else{
        locations = await Location.findAll({
          include: [
            { model: User, as: 'host' },
            { model: Comment, include: [{ model: User, as: 'commentCreator' }] }],
          where: {address: {[Op.iLike]: `%${cityandstate}%`}}
        })
      }
}
      res.send(locations)
    }, 1000)
  } catch (error) {
    throw error
  }
}

const hostLocation = async (req, res) => {
  const imgUrls = []
  try {
    const { name ,images, user_Id, address, description, price } = req.body

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
        name: name,
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
    const location = await Location.update(req.body, { where: { id: id }, returning: true })

    res.send(location)
  } catch (error) {
    throw error
  }
}

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params
    await Location.destroy({ where: { id: id } })
    res.send({ message: `Location with id ${id} has been deleted` })
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
  filterLocations
}
