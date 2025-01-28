const express = require('express');
<<<<<<< HEAD
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
=======
const { signup, login } = require('../controllers/authUser');
const { ownerSignup, ownerLogin } = require('../controllers/authOwner');

const router = express.Router();

router.post('/usersignup', signup);
router.post('/userlogin', login);
router.post('/ownersignup', ownerSignup);
router.post('/ownerlogin', ownerLogin);
>>>>>>> 8c818153a37f92069c4542eeb5fa30fe60a2f422

module.exports = router;
