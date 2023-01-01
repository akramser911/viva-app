const express = require ('express');
const { getUser} = require('../logic/users');
const router = express.Router();


router.get('/user/:id', getUser);

router.get("/", (req, res)=> {
    res.send('hey its user route');
})

module.exports = router;