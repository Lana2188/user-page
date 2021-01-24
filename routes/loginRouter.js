const { Router } = require('express')
const { loginPage, loginPost, logOut } = require('../controller/loginController')
const { validInputData } = require('../middleware/validation')

const router = Router()


router.route('/login').get(loginPage)
    .post(validInputData, loginPost)

router.get('/logout', logOut)

module.exports = router