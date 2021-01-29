const moment = require('moment')

function messageObj(userId,  username, avatar, message ){
return {
    userId,
    username,
    avatar,
    message,
    time: moment().format('h:mm a')
}
}

module.exports = messageObj