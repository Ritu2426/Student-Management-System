const Student = require('../models/students');

exports.getAllStudents = function(req, res) {
    Student.getAllStudents((err, students) => {
        if (err) throw err;
        res.json(students);
    });
};

exports.getStudentById = function(req, res) {
    Student.getStudentById(req.params.id, (err, student) => {
        if (err) throw err;
        res.json(student);
    });
};

exports.addStudent = function(req, res) {
    const newStudent = {
        name: req.body.name,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo
    };

    Student.addStudent(newStudent, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student created successfully' });
    });
};

exports.updateStudent = function(req, res) {
    const updatedStudent = {
        name: req.body.name,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo
    };

    Student.updateStudent(req.params.id, updatedStudent, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated successfully' });
    });
};

exports.deleteStudent = function(req, res) {
    Student.deleteStudent(req.params.id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully' });
    });
};