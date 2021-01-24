const { check, validationResult } = require('express-validator')


module.exports.validInputData = [
    check('email', 'Invalid data').isEmail(),
    check('password', 'Invalid data').isLength({ min: 7 }),

    (req, res, next) => {
        
        const ejs = req.path.replace('/', '')
        // console.log(ejs)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let errArray = errors.array()

            for (let errobj of errArray) {
                return res.render(ejs, { message: errobj.msg })
            }


        } else next()
    }
]