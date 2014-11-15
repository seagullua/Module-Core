/**
 * Created by Diana on 14.11.14.
 */
var nodemailer = require('nodemailer');
var fs = require("fs");
var Config = include('Core/Config');
var path = require('path');
var transport = null;
var HeaderFooterModule = include(Config.email.letter_header_footer.module);
var Render = include('Core/Templates/Render');
var View = include('System/Loaders/View');
var emailTemplates = require('email-templates');

exports.configureBeforeLaunch = function() {
    transport = nodemailer.createTransport("SMTP", {
        service: 'gmail',
        auth: {
            user: Config.email.smtp.login,
            pass: Config.email.smtp.password
        }
    });
    console.log("SMTP initialized");
};




function sendEmail(html, subject, receiver, callback) {
    var path_to_folder = View.viewFileName(HeaderFooterModule.view('email'));
    emailTemplates(path_to_folder, function(err, template) {
        if (err) {
            console.log(err);
            return callback(err);
        }

        template('basic', {html: html}, function(err, html) {
            if (err) {
                console.log(err);
                return callback(err);
            }

            var message = {
                from: Config.email.from_name + ' <'+Config.email.from+'>',
                to: '<' + receiver + '>',
                replyTo: '<' + Config.email.reply_to + '>',
                subject: subject,
                html: html
            };

            transport.sendMail(message, callback);
        });

    });


}
exports.sendEmail = sendEmail;


