const db = require('../models')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Op } = require("sequelize")

// create main Model
const Users = db.users

const signUp = async (req, res) => {
    //Sign up
    const user = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password,
        Email: req.body.Email
    }

    Users.findOne({where:{Email: req.body.Email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!",
            });
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.Password, salt, async function(err, hash){
                    const user = {
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Password: hash,
                        Email: req.body.Email
                    }
                
                    await Users.create(user).then(result => {
                        console.log("signup user created -------------", result)
                        res.status(200).json({
                            message: "User created successfully",
                            firstName: result.dataValues.FirstName,
                            lastName: result.dataValues.LastName,
                            email: result.dataValues.Email,
                            id: result.dataValues.id
                        });
                    }).catch(error => {
                        console.log("signup Something went wrong! -------------", error)
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


const login = async(req, res) => {
    Users.findOne({where:{Email: req.body.Email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        } else {
            bcryptjs.compare(req.body.Password, user.Password, function(err, result){
                console.log("----------",result)
                if(result){
                    const token = jwt.sign({
                        Email: user.Email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        console.log(" Backend ->>>>>> Authentication successfull ", user)
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token,
                            firstName: user.dataValues.FirstName,
                            lastName: user.dataValues.LastName,
                            email: user.dataValues.Email,
                            id: user.dataValues.id
                        });
                    });
                }else{
                    console.log(" Backend ->>>>>> Invalid credentials ")
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        console.log(" Backend ->>>>>> Logging Error ")
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

module.exports = {
    signUp: signUp,
    login: login
} 