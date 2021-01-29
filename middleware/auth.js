const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {

try{

const token = req.signedCookies['access-jwt']
// console.log(token)

// if no token redirect to login
if(!token){
    return res.redirect('/login')
}else{

    // verify and decode token
    jwt.verify(token, config.get('jwtsecret'), (err, decoded)=>{
        if (err){
            console.log('Token error')
            return res.redirect('/login')
        }else{
            // console.log('decode' +decoded)
            req.user = decoded
            next()
        }
    })
}



}catch(e){
    console.log('auth: ' + e)
}


}

