const pemesananModel = require(`../models/index`).pemesanan
const detailModel = require(`../models/index`).detail_pemesanan
const Op = require(`sequelize`).Op
const { path } = require(`../models/pemesanan`)
const fs = require(`fs`)
const md5 = require(`md5`)


exports.getAllPemesanan = async (request, response) => {
    let pemesanan = await pemesananModel.findAll()
    return response.json({
        success: true,
        data: pemesanan,
        message: `All pemesanan have been loaded`
    })
}

exports.findPemesanan = async (request, response) => {

    let keyword = request.body.keyword

    let pemesanan = await pemesananModel.findAll({
        where: {
            [Op.or]: [
                { nama_pemesanan: { [Op.substring]: keyword } },
                { email_pemesanan: { [Op.substring]: keyword } },
                { tgl_pemesanan: { [Op.substring]: keyword } },
                { tgl_check_in: { [Op.substring]: keyword } },
                { tgl_check_out: { [Op.substring]: keyword } },
                { nama_tamu: { [Op.substring]: keyword } },
                { jumlah_kamar: { [Op.substring]: keyword } },
                { id_tipe_kamar: { [Op.substring]: keyword } },
                { status_pemesanan: { [Op.substring]: keyword } },
                { id_user: { [Op.substring]: keyword } },

            ]
        }
    })
    return response.json({
        success: true,
        data: pemesanan,
        message: `All pemesanan have been loaded`
    })
}


exports.addPemesanan = (request, response) => {
    try {
        var random = Math.random() * 100;
        console.log(random);

        let newPemesanan = {
            nama_pemesanan: request.body.nama_pemesanan,
            email_pemesanan: request.body.email_pemesanan,
            tgl_pemesanan: request.body.tgl_pemesanan,
            tgl_check_in: request.body.tgl_check_in,
            tgl_check_out: request.body.tgl_check_out,
            nama_tamu: request.body.nama_tamu,
            jumlah_kamar: request.body.jumlah_kamar,
            id_tipe_kamar: request.body.id_tipe_kamar,
            status_pemesanan: request.body.status_pemesanan,
            id_user: request.body.id_user
        }
        console.log(newPemesanan)

        pemesananModel.create(newPemesanan).then(
            result => {
            return response.json({
                success: true,
                data: result,
                message: `Pemesanan telah ditambahkan`
            })
        })
    }
    catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}


exports.updatePemesanan = (request, response) => {
        let dataPemesanan = {
            nama_pemesanan: request.body.nama_pemesanan,
            email_pemesanan: request.body.email_pemesanan,
            tgl_pemesanan: request.body.tgl_pemesanan,
            tgl_check_in: request.body.tgl_check_in,
            tgl_check_out: request.body.tgl_check_out,
            nama_tamu: request.body.nama_tamu,
            jumlah_kamar: request.body.jumlah_kamar,
            id_tipe_kamar: request.body.id_tipe_kamar,
            status_pemesanan: request.body.status_pemesanan,
            id_user: request.body.id_user
        }

        let idPemesanan = request.params.id

        pemesananModel.update(dataPemesanan, { where: { id: idPemesanan } })
            .then(result => {

                return response.json({
                    success: true,
                    message: `Data pemesanan has been updated`
                })
            })
            .catch(error => {

                return response.json({
                    success: false,
                    message: error.message
                })
            })
    }

exports.deletePemesanan = (request, response) => {

    let idPemesanan = request.params.id

    pemesananModel.destroy({ where: { id: idPemesanan } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data pemesanan has been deleted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}