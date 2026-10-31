
import express from 'express';
import { body } from 'express-validator';

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from '../controllers/authController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration
router.post(
    '/register',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ max: 60 })
            .withMessage('Name cannot exceed 60 characters'),

        body('email')
            .trim()
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),

        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
    ],
    registerUser
);

// Login
router.post(
    '/login',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),

        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
    loginUser
);

// Get authenticated user's profile
router.get('/me', protect, getCurrentUser);

export default router;
