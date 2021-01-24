const { User } = require('../models/user')
const bcrypt = require('bcryptjs')

class RegistrationController {

    // redirect to /registration
    registration(req, res) {
        res.redirect('/registration')
    };

    // Get registration page 
    registrationGet(req, res) {
        res.render('registration',  { message: '' })
    };


    // Regitration post
    async regPost(req, res) {
        // console.log(req.body)

        try {
            const {name, gender, email, password } = req.body

            const someone = await User.findOne({ email })
            if (someone) {
                res.render('registration', { message: 'Wrong data' })
            }
            const hashedPass = await bcrypt.hash(password, 12)
            const user = new User({name, gender, email, password: hashedPass })

            await user.save()
            res.redirect('/login')



        } catch (e) {
            console.log('registration: ' + e)
        }

    }

}


module.exports = new RegistrationController()