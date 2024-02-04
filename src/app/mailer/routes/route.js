const router = require('express').Router();

const { signUp, getBill, sendMail } = require('../controller/appController');


/**HTTP Request*/
router.post('/user/signup',signUp);
router.post('/product/getBill', getBill);
router.post('/sendMail', sendMail);

module.exports = router;