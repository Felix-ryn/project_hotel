'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kamar extends Model {
  
    static associate(models) {
      
    }
  }
  tipe_kamar.init({

    nama_tipe_kamar : DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe_kamar',
  });
  return tipe_kamar;
};