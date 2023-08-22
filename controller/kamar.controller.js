const kamarModel = require(`../models/index`).kamar
const tipekamarModel = require(`../models/index`).tipe_kamar
const Op = require(`sequelize`).Op
const { path } = require(`../models/kamar`)
const multer = require(`multer`)
const fs = require(`fs`)
const md5 = require(`md5`)
const Sequelize = require("sequelize");
const sequelize = new Sequelize("lat_hotel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


exports.getAllKamar = async (request, response) => {
    const result = await sequelize.query(
        "SELECT kamars.nomer_kamar,tipe_kamars.nama_tipe_kamar FROM kamars JOIN tipe_kamars ON tipe_kamars.id = kamars.id_tipe_kamar ORDER BY kamars.id ASC"
    );
    response.json(result[0]);
};

exports.findKamar = async (request, response) => {
    let nomer_kamar = request.body.nomer_kamar
    const result = await sequelize.query(
      `SELECT kamars.id,kamars.nomer_kamar,tipe_kamars.nama_tipe_kamar FROM kamars JOIN tipe_kamars ON tipe_kamars.id = kamars.id_tipe_kamar where kamars.nomer_kamar= ${nomer_kamar} ORDER BY kamars.id ASC `
    );
    return response.json({
      success: true,
      data: result[0],
      message: `Room have been loaded`,
    });
  };

exports.addKamar = async (request, response) => {
    try {
        let newKamar = {
            nomer_kamar: request.body.nomer_kamar,
            id_tipe_kamar: request.body.id_tipe_kamar,
        }

        let cektipe = await tipekamarModel.findOne({
            where: {
                [Op.or]: [{ id: { [Op.substring]: newKamar.id_tipe_kamar } }],
            },
        });
        if (newKamar.id_tipe_kamar == cektipe.id) {
            await kamarModel.create(newKamar).then((result) => {
                return response.status(200).json({
                    success: true,
                    data: result,
                    message: 'kamar telah ditambahkan',
                });
            });
        }

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.updateKamar = async (request, response) => {
    try {
        let dataKamar = {
            nomer_kamar: request.body.nomer_kamar,
            id_tipe_kamar: request.body.id_tipe_kamar,
        };

        let idKamar = request.params.id;

        let cekTipe = await tipekamarModel.findOne({
            where: {
                [Op.or]: [{ id: { [Op.substring]: dataKamar.id_tipe_kamar } }],
            },
        });

        if (dataKamar.id_tipe_kamar == cekTipe.id) {
            kamarModel
                .update(dataKamar, { where: { id: idKamar } })
                .then((result) => {
                    return response.json({
                        success: true,
                        message: `Data kamar has been updated`,
                    });
                });
        }
    } catch (error) {
        return response.json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteKamar = (request, response) => {
    let idKamar = request.params.id;

    kamarModel
        .destroy({ where: { id: idKamar } })
        .then((result) => {
            return response.json({
                success: true,
                message: `Data kamar has been deleted`,
            });
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
};
