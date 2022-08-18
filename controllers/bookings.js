const { User, Booking, Location } = require('../models')
const { Op } = require('sequelize')

const createBooking = async (req, res) => {
  console.log(req.body)
  try {
    const { user_id, location_id, start_date, end_date } = req.body
    let startBetween, endBetween, available

    const bookings = await Booking.findAll({
      where: { location_Id: location_id }
    })

    if (bookings.length !== 0) {
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
          available = false
          break
        } else {
          available = true
        }
      }
    } else {
      available = true
    }

    setTimeout(async () => {
      if (available) {
        const booking = await Booking.create({
          user_Id: user_id,
          location_Id: location_id,
          start_date: start_date,
          end_date: end_date
        })
        res.send(booking)
      } else {
        res.send({ message: 'unavailable' })
      }
    }, 1000)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createBooking
}
