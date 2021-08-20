import express from 'express';

const router = express.Router();


router.post('/api/users/signout', (req, res) => {
    const { email, password } = req.body;
    res.send('Hi there !! sss');
});

export { router as signoutRouter };