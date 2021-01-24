const { User } = require('../models/user')

class userController {

    async userPage(req, res) {

        const user = await User.findOne({ email: req.user.email })
        console.log(user)
        res.render('user', { user })
    };

    async userPost(req, res) {

        try {
            // console.log(req.user)
            const user = await User.findOne({ email: req.user.email })
            if (!user) {
                console.log("Can't find user")
                return res.redirect('/user/main')
            }
            // when uploading both photos
            if (req.files.avatar && req.files.bgPhoto) {
                const avatar = req.files.avatar[0].filename
                const bg = req.files.bgPhoto[0].filename

                user.avatar = avatar;
                user.bgPhoto = `/uploads/${bg}`
                await user.save()
                return res.redirect('/user/main')

            } else if (!req.files.avatar && req.files.bgPhoto) {      // when uploads just bg image
                const bg = req.files.bgPhoto[0].filename

                user.bgPhoto = `/uploads/${bg}`
                await user.save()
                return res.redirect('/user/main')

            } else if (req.files.avatar && !req.files.bgPhoto) {  // when uploads just avatar
                const avatar = req.files.avatar[0].filename
                user.avatar = avatar;
                await user.save()
                return res.redirect('/user/main')
            }

        } catch (e) {
            console.log('user: ' + e)
        }
    }





}

module.exports = new userController()