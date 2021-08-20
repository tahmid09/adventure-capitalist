import express from 'express';

const router = express.Router();


router.get('/api/users/currentuser', (req, res) => {
    console.log('porst 3000 working')
    res.send('Hi there !! sss');
});

export { router as currentuserRouter };