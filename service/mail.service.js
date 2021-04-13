const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {ROOT_EMAIL, ROOT_EMAIL_PASSWORD} = require('../config/config');
const allTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userEmail, action, context) => {
    try {
        const templateInfo = allTemplates[action];

        if (!templateInfo) {
            throw new Error('WRONG EMAIL ACTION')
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userEmail,
            subject: templateInfo.subject,
            html
        })
    } catch (error) {
        throw new Error('CANT SEND MESSAGE TO EMAIL')
    }
}

module.exports = {
    sendMail
}
