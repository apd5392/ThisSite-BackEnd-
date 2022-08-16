const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const AppRouter = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
)
app.get('/', (req, res) => res.json({ message: 'Server Works' }))

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
