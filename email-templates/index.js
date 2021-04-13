const {emailActionEnum} = require('../constants');

module.exports = {
    [emailActionEnum.USER_CREATED]: {
        templateName: 'user-created',
        subject: 'Welcome in team'
    },
    [emailActionEnum.USER_DELETED]: {
        templateName: 'user-deleted',
        subject: 'FUCK OFF, but you can comeback'
    },
    [emailActionEnum.PASSWORD_CHANGED]: {
        templateName: 'user-password-changed',
        subject: 'Hope its  yours password'
    },
    [emailActionEnum.ACCOUNT_RESTORED]: {
        templateName: 'user-restored',
        subject: 'Account restored'
    }
}
