const { User } = require('../models')

const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const login = async (req, res) => {
  console.log(req.body)

  try {
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (!user) {
      res.send({ message: 'user does not exist' })
    } else {
      if (req.body.password === user.password) {
        res.send(user)
      } else {
        res.send({ message: 'incorrect password' })
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  login
}
