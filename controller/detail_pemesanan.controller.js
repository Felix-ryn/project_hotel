const detail_pemesananModel = require(`../models/index`).detail_pemesanan
const Op = require(`sequelize`).Op
const { path } = require(`../models/detail_pemesanan`)
const upload = require(`./upload-foto`).single(`foto`)
const fs = require(`fs`)
const md5 = require(`md5`)


exports.getAllDetail = async (request, response) => {
    let detail_pemesanan = await detail_pemesananModel.findAll()
    return response.json({
        success: true,
        data: detail_pemesanan,
        message: `All detail_pemesanan have been loaded`
    })
}

exports.findDetail = async (request, response) => {

    let keyword = request.body.keyword

    let detail_pemesanan = await detail_pemesananModel.findAll({
        where: {
            [Op.or]: [
                { id_pemesanan: { [Op.substring]: keyword } },
                { id_kamar: { [Op.substring]: keyword } },
                { tgl_akses: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: detail_pemesanan,
        message: `All detail_pemesanan have been loaded`
    })
}


exports.addDetail = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    
    let newDetail = {
        id_pemesanan: request.body.id_pemesanan,
        id_kamar: request.body.id_kamar,
        tgl_akses: request.body.tgl_akses,
        harga: request.body.harga
        
    }
    
    detail_pemesananModel.create(newDetail).then(result => {
        return response.json({
            success: true,
            data: result,
            message: `Detail telah ditambahkan`
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


exports.updateDetail = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    let dataDetail = {
        id_pemesanan: request.body.id_pemesanan,
        id_tipe_detail_pemesanan: request.body.id_tipe_detail_pemesanan
    }

    let idDetail = request.params.id

    detail_pemesananModel.update(dataDetail, { where: { id: idDetail } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data detail_pemesanan has been updated`
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

exports.deleteDetail = (request, response) => {

    let idDetail = request.params.id

    detail_pemesananModel.destroy({ where: { id: idDetail } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data detail_pemesanan has been deleted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}