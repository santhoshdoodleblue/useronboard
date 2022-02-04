const express = require('express')
const router = express.Router()

const validator = require('express-joi-validation').createValidator({
    passError:false
})

const AuthController = require('../controllers/AuthController')
const authenticate=require('../middleware/authenticate')
const {updateSchema}=require('../middleware/validate')

const validate=validator.body(updateSchema)

router.get('/',authenticate,AuthController.index)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.put('/update',authenticate,validate,AuthController.update)
router.post('/address',authenticate,AuthController.address)
router.get('/view',authenticate,AuthController.showAddress)

module.exports = router