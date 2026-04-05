const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');

const router = express.Router();

// Routes

//Auth
router.post('/signup', authController.addUser);
router.post('/login', authController.getLogin);
router.post('/token', validate, authController.validateToken);

//Student
router.get('/', validate, studentController.getAllStudents);
router.get('/:id', validate, studentController.getStudentById);
router.post('/addStudent', validate, studentController.addStudent);
router.put('/updateStudent/:id', validate, studentController.updateStudent);
router.delete('/deleteStudent/:id', validate, studentController.deleteStudent);

module.exports = router;