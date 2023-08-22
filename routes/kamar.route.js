const express = require(`express`)
const app = express()
app.use(express.json())
const kamarController =
require(`../controller/kamar.controller`)
app.get("/", kamarController.getAllKamar)
app.post("/add", kamarController.addKamar)
app.post("/find", kamarController.findKamar)
app.put("/:id", kamarController.updateKamar)
app.delete("/:id", kamarController.deleteKamar)
module.exports = app