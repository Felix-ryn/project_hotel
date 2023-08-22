const userModel = require(`../models/index`).user
const Op = require(`sequelize`).Op
const { path } = require(`../models/user`)
const upload = require(`./upload-foto`).single(`foto`)
const fs = require(`fs`)
const md5 = require(`md5`)
const Sequelize = require("sequelize");
const sequelize = new Sequelize("lat_hotel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "secretcode";

exports.login = async (request, response) => {
  try {
    const params = {
      email: request.body.email,
      password: md5(request.body.password),
    };

    const findUser = await userModel.findOne({ where: params });
    if (findUser == null) {
      return response.status(404).json({
        message: "email or password doesn't match",
        err: error,
      });
    }
    console.log(findUser);
    //generate jwt token
    let tokenPayLoad = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };
    tokenPayLoad = JSON.stringify(tokenPayLoad);
    let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

    return response.status(200).json({
      message: "Success login",
      data: {
        token: token,
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal error",
      err: error,
    });
  }
};

exports.getAllUser = async (request, response) => {
    let user = await userModel.findAll()
    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded`
    })
}

exports.findUser = async (request, response) => {

    let nama = request.body.nama_user
    let emailnya = request.body.email

    let user = await userModel.findAll({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: nama } },
                { email: { [Op.substring]: emailnya} }
            ]
        }
    })
    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded`
    })
}


exports.addUser = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    
    let newUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role,
    }
    
    userModel.create(newUser).then(result => {
        return response.json({
            success: true,
            data: result,
            message: `User telah ditambahkan`
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


exports.updateUser = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    
    let dataUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role

    }

    let idUser = request.params.id

    userModel.update(dataUser, { where: { id: idUser } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data user has been updated`
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

exports.deleteUser = (request, response) => {

    let idUser = request.params.id

    userModel.destroy({ where: { id: idUser } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}

