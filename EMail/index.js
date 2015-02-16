/**
 * Created by Diana on 14.11.14.
 */
var nodemailer = require('nodemailer');
var fs = require("fs");
var Config = include('Core/Config');
var path = require('path');
var transport = null;
var HeaderFooterModule = include(Config.email.letter_header_footer.module);
var EmailTemplates = include('Core/EMail/Templates');

exports.configureBeforeLaunch = function () {
    transport = nodemailer.createTransport("SMTP", {
        service: Config.email.smtp.service,
        auth: {
            user: Config.email.smtp.login,
            pass: Config.email.smtp.password
        }
    });
    console.log("SMTP initialized");
};


function sendEmail(html, subject, receiver, language, callback) {
    var view = HeaderFooterModule.view(Config.email.letter_header_footer.name);

    var html = EmailTemplates.renderEmailTemplate(view, language, {html: html});
    html = EmailTemplates.embedMainCss(html);

    var message = {
        from: Config.email.from_name + ' <' + Config.email.from + '>',
        to: '<' + receiver + '>',
        replyTo: '<' + Config.email.reply_to + '>',
        subject: subject,
        html: html
    };

    transport.sendMail(message, callback);

}
exports.sendEmail = sendEmail;


