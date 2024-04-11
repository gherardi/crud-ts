import express, { Router } from 'express';

import * as apiController from '../controllers/apiController';
import * as authController from '../controllers/authController';

import { isAuthenticated } from '../middlewares/auth';
// import { validatePagination, validateSorting } from '../middlewares/validator';

const router: Router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/', apiController.getAll);
router.get('/:id', apiController.getById);

router.use(isAuthenticated);

router.post('/', apiController.create);
router.patch('/:id', apiController.updateById);
router.delete('/:id', apiController.deleteById);

export default router;
