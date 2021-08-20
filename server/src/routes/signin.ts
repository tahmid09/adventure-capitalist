import express from 'express';

const router = express.Router();


router.post('/api/users/signin', (req, res) => {
    console.log('porst 3000 working')
    res.send('Hi there !! sss');
});

export { router as signinRouter };