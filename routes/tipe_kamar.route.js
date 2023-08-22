const express = require(`express`)
const app = express()
app.use(express.json())
const tipe_kamarController =
require(`../controller/tipe_kamar.controller`)
app.get("/", tipe_kamarController.getAllTipe)
app.post("/add", tipe_kamarController.addTipe)
app.post("/find", tipe_kamarController.findTipe)
app.put("/:id", tipe_kamarController.updateTipe)
app.delete("/:id", tipe_kamarController.deleteTipe)
module.exports = app