const router = require('express').Router();

const { signUp, getBill, sendMail, getToken } = require('../controller/appController');


/**HTTP Request*/
router.post('/user/signup',signUp);
router.post('/product/getBill', getBill);
router.post('/sendMail', sendMail);
router.post('/getToken', getToken);

module.exports = router;