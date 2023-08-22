const express = require("express")
const app = express()
var bodyParser = require('body-parser')
const PORT = 8080
const cors = require(`cors`)
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
const userRoute = require(`./routes/user.route`)
const tipe_kamarRoute = require(`./routes/tipe_kamar.route`)
const pemesananRoute = require(`./routes/pemesanan.route`)
const kamarRoute = require(`./routes/kamar.route`)
const detail_pemesananRoute = require(`./routes/detail_pemesanan.route`)
app.use("/user", userRoute)
app.use("/tipe_kamar", tipe_kamarRoute)
app.use("/pemesanan", pemesananRoute)
app.use("/kamar", kamarRoute)
app.use("/detail_pemesanan", detail_pemesananRoute)

app.use(express.static(__dirname))
app.listen(PORT, () => {
    console.log(`PORT ${PORT}`)
})