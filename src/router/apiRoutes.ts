import express, { Router } from 'express';

import * as apiController from '../controllers/apiController';
import * as authController from '../controllers/authController';

import { isAuthenticated } from '../middlewares/auth';

import {
	validateEmail,
	validatePassword,
	validateCreation,
	validateUpdating,
} from '../middlewares/validate';

const router: Router = express.Router();

router.post('/signup', validateEmail, validatePassword, authController.signup);
router.post('/login', validateEmail, validatePassword, authController.login);
router.get('/logout', authController.logout);

router.get('/', apiController.getAll);
router.get('/:id', apiController.getById);

router.use(isAuthenticated);

router.post('/', validateCreation, apiController.create);
router.patch('/:id', validateUpdating, apiController.updateById);
router.delete('/:id', apiController.deleteById);

export default router;
