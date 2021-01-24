const bcrypt = require('bcryptjs')
const {User} = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')


class loginController{

    // get login page

    loginPage(req,res){
        res.render('login',  { message: '' })
    };

    // post login
  async  loginPost(req,res){
        // console.log(req.body)
        try{

            const {email, password} = req.body

            const isUser = await User.findOne({email})
            if(!isUser){
              return  res.render('login', {message: 'Wrong data'})
            }

const isMatch = await bcrypt.compare(password, isUser.password)

if(!isMatch){
  return  res.render('login', {message:'Wrong data'})
}

const token = jwt.sign({
  id:isUser._id,
  email:isUser.email
}, config.get('jwtsecret'),
{expiresIn: '24h' });

 res.cookie('access-jwt',token,{signed:true, maxAge: 86400000})
// console.log(token)

res.redirect('/user/main')

        }catch (e){
console.log('login: ' + e)
        }


    }


// logout
logOut(req,res){
    res.clearCookie('access-jwt')
    res.redirect('/login')
}

}

module.exports= new loginController()