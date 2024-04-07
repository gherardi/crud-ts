import express, { Router } from 'express';

import * as APIController from '../controllers';
import * as authController from '../controllers/authController';

import { validatePagination, validateSorting } from '../middlewares/validator';
import { isAuthenticated } from '../middlewares/auth';

const router: Router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/', APIController.getAll);
router.get('/:id', APIController.getById);

router.use(isAuthenticated);

router.post('/', APIController.create);
router.patch('/:id', APIController.updateById);
router.delete('/:id', APIController.deleteById);

export default router;
