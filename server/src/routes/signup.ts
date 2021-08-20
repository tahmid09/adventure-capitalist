import express, { Request, Response } from 'express';
const { body, validationResult } = require('express-validator');

const router = express.Router();


router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid email or password check');
        error.reason = errors.toArray();  
       throw new Error('Invalid email or password check'); 
      // return res.status(400).send(errors.array()); 
    }

    const { email, password } = req.body;

    console.log('Creating a user...')

    throw new Error('Error connection to database'); 
   
    res.send({})
    
});

export { router as signupRouter };