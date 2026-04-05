const db = require('../config/database');

exports.addUser = function(newUser, callback) {
    db.query('INSERT INTO usercredential SET ?', newUser, callback);
};

exports.getLogin = function(user, callback) {
    db.query('SELECT * FROM usercredential WHERE emailId = ?', user.emailId, callback);
};
