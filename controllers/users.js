const { User, Location } = require('../models')
const middleware = require('../middleware')
const { default: jwtDecode } = require('jwt-decode')
const jwt_decode = require('jwt-decode')

const createUser = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, phoneNumber, password } =
      req.body

    const passwordDigest = await middleware.hashPassword(password)

    const user = await User.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: passwordDigest
    })

    setTimeout(async () => {
      const userInfo = await User.findByPk(user.id, {
        include: [{ model: Location, as: 'host' }]
      })
      res.send(userInfo)
    }, 1500)
  } catch (error) {
    throw error
  }
}

const login = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({
      where: { userName: req.body.userName },
      include: [{ model: Location, as: 'host' }]
    })

    if (
      user &&
      (await middleware.comparePassword(user.password, req.body.password))
    ) {
      let payload = {
        id: user.id,
        userName: user.userName
      }

      let token = middleware.createToken(payload)
      return res.send({ user: user, token })
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params

  await User.update(req.body, {
    where: { id: id },
    returning: true
  })

  const user = await User.findByPk(id, {
    include: [{ model: Location, as: 'host' }]
  })

  res.send(user)
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  await User.destroy({ where: { id: id } })
  res.send({ message: `User with id ${id} has been deleted` })
}

const CheckSession = async (req, res) => {
  console.log('checl section, ', res.locals.token)
  const { token } = res.locals
  const info = jwt_decode(token)

  const user = await User.findOne({
    where: { userName: info.userName },
    include: [{ model: Location, as: 'host' }]
  })

  res.send(user)
}

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  CheckSession
}
