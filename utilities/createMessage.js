
const moment = require('moment');

function createMessage(username,message){
    return{
        username:username,
        message:message,
        time:moment().format('h:mm a')
    }
}

module.exports = createMessage;