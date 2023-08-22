const express = require(`express`)
const app = express()
app.use(express.json())
const detail_pemesananController =
require(`../controller/detail_pemesanan.controller`)
app.get("/", detail_pemesananController.getAllDetail)
app.post("/add", detail_pemesananController.addDetail)
app.post("/find", detail_pemesananController.findDetail)
app.put("/:id", detail_pemesananController.updateDetail)
app.delete("/:id", detail_pemesananController.deleteDetail)
module.exports = app