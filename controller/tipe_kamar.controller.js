const tipe_kamarModel = require(`../models/index`).tipe_kamar
const Op = require(`sequelize`).Op
const { path } = require(`../models/tipe_kamar`)
const upload = require(`./upload-foto`).single(`foto`)
const fs = require(`fs`)
const md5 = require(`md5`)


exports.getAllTipe = async (request, response) => {
    let tipe_kamar = await tipe_kamarModel.findAll()
    return response.json({
        success: true,
        data: tipe_kamar,
        message: `All tipe_kamar have been loaded`
    })
}

exports.findTipe = async (request, response) => {

    let nama_tipe_kamar = request.body.nama_tipe_kamar
    let harga = request.body.harga
    let deskripsi = request.body.deskripsi
    
    let tipe_kamar = await tipe_kamarModel.findAll({
        where: {
            [Op.or]: [
                { nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } },
                { harga: { [Op.substring]: harga } },
                { deskripsi: { [Op.substring]: deskripsi } },
                
            ]
        }
    })
    return response.json({
        success: true,
        data: tipe_kamar,
        message: `All tipe_kamar have been loaded`
    })
}


exports.addTipe = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    let newTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.file.filename
    }
    
    tipe_kamarModel.create(newTipe).then(result => {
        return response.json({
            success: true,
            data: result,
            message: `Tipe telah ditambahkan`
        })
    })
    
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
})
}


exports.updateTipe = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    let dataTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    }

    let idTipe = request.params.id

    tipe_kamarModel.update(dataTipe, { where: { id: idTipe } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data tipe_kamar has been updated`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
})
}

exports.deleteTipe = (request, response) => {

    let idTipe = request.params.id

    tipe_kamarModel.destroy({ where: { id: idTipe } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data tipe_kamar has been deleted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}