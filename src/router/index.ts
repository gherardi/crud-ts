import express, { Router } from 'express';

import * as APIController from '../controllers';

import { validatePagination, validateSorting } from '../middlewares/validator';

const router: Router = express.Router();

router.get('/', validatePagination, validateSorting, APIController.get);

router.get('/:id', APIController.getById);

router.post('/', APIController.post);

router.patch('/:id', APIController.patchById);

router.delete('/:id', APIController.deleteById);

export default router;
