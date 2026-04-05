const AuthUser = require('../models/authUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.addUser = async function(req, res) {

    async function hashPassword(password) {
        const saltRounds = 12;
        try {
          const hash = await bcrypt.hash(password, saltRounds);
          return hash;
        } catch (error) {
          throw error; 
        }
    }

    const hash = await hashPassword(req.body.password.toString());
    
    const newUser = {
        userName : req.body.userName,
        emailId: req.body.emailId,
        password: hash
    };

    AuthUser.getLogin(newUser, (err, result) => {
        if (err) throw err;

        if(result.length > 0) {
            return res.status(409).json({ message : 'Email Already Exists' })
        } else {
            AuthUser.addUser(newUser, (err, result) => {
                if (err) throw err;
                res.json({ message: 'SignUp Successful' });
            });
        }
    });
  
};

exports.getLogin = function(req, res) {

    const user = {
        emailId: req.body.emailId,
        password: req.body.password
    };

    AuthUser.getLogin(user, (err, result) => {
        if (err) throw err;

        if(result.length > 0) {
            bcrypt.compare(user.password.toString(), result[0].password.toString(), (err, data) => {
                if (err) throw err;

                if(data) {
                    const userName = result[0].userName;
                    const token =  jwt.sign({ userName: userName }, process.env.ACCESS_TOKEN_SECRET, {
                        'expiresIn': '1d'
                    })

                    return res.json(
                        { 
                            token: token, 
                            message: 'Login Successful' 
                        }
                    );

                } else {
                    return res.status(401).json({ message: 'Password not matched' })
                }
            })
        } else {
            return res.status(404).json({ message : 'No Email Exists' })
        }
    });

};

exports.validateToken = function(req, res) {

    return res.json({ message : 'Validated' });
    
};
