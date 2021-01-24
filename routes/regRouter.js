const {Router} = require("express") 
const { registration, registrationGet, regPost} = require("../controller/registrationController.js") 
const {validInputData} = require('../middleware/validation.js')
const router = Router()


// registration route

router.get('/', registration)

router.route('/registration').get(registrationGet)
.post(validInputData, regPost)



module.exports = router