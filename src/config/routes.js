import express from 'express';
import contactController from '../api/controllers/contact.controller';
import userController from '../api/controllers/user.controller';
import noteController from '../api/controllers/note.controller';

export const router = express.Router();

// Contacts
router.get('/contacts', userController.verifyToken, contactController.findAll);
router.get('/contacts/:id', userController.verifyToken, contactController.findOne);
router.delete('/contacts/:id', userController.verifyToken, contactController.delete);
router.put('/contacts/:id', userController.verifyToken, contactController.update);
router.post('/contacts', userController.verifyToken, contactController.create);

// categories
router.post('/categories', userController.verifyToken, contactController.createCategory);
router.get('/categories/:id', userController.verifyToken, contactController.findAllCategory);
router.get('/categories/:id', userController.verifyToken, contactController.findOneCategory);
router.delete('/categories/:id', userController.verifyToken, contactController.deleteCategory);
router.put('/categories/:id', userController.verifyToken, contactController.updateCategory);

// Users
router.post('/registerUser', userController.createUser);
router.post('/login', userController.login);
router.get('/profile/:token', userController.verifyToken, userController.getUser);

// Businesses
router.post('/registerBusiness', userController.createBusiness);
router.post('/loginBusiness', userController.loginBusiness);

// Notes
router.get('/notes', userController.verifyToken, noteController.findAll);
router.get('/notes/:id', userController.verifyToken, noteController.findOne);
router.delete('/notes/:id', userController.verifyToken, noteController.delete);
router.put('/notes/:id', userController.verifyToken, noteController.update);
router.post('/notes', userController.verifyToken, noteController.create);
