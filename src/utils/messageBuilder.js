import { Message } from 'element-ui';
const buildMessage = function(type, message){
    Message({
        type,
        message
    })
}

export {
    buildMessage
}