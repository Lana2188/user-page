const { Router } = require('express')
const { userPage, userPost } = require('../controller/userController')
const token = require('../middleware/auth')
const upload = require('../middleware/multer')

const router = Router()

const imgFields = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'bgPhoto', maxCount: 1 }])

router.route('/main').get(token, userPage)
    .post(token, imgFields, userPost)

module.exports = router