const moment = require('moment');

const formatMessage = (username, color, text, type) => {
    return {
        username,
        color,
        text,
        type,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage