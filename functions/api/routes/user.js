import express from 'express';
// import { check } from 'express-validator';
const router = express.Router();

import { userController } from '.../controller';

router.get('/', userController.getUser);