/**
 * Created by nastia on 18.10.14.
 */

var UserService = include('Core/User').db;
var mongoose = require('mongoose'),
    should = require('should');
var db = mongoose.connection;


describe('User', function() {

    var users = [
        {email : "test1@mail.mail", password : "test1"},
        {email : "test2@mail.mail", password : "test2"},
        {email : "test3@mail.mail", password : "test3"}
    ];

    before(function(done){
        db.collections.users.drop(function() {
            db.collections.users.insert(users, done);
        });
    });

    describe('#create()', function() {
        var testUser = {
            email: "john@mail.mail",
            password: "pass"
        };
        it('should create user in database', function(done) {
            UserService.createUser(testUser.email, testUser.password, function(err, createdUser) {
                should.not.exist(err);
                createdUser.should.have.property('email', testUser.email);
                done();
            });
        });
    });

    describe("#findByEmail()", function() {
        it('should find user in database by email', function(done) {
            UserService.findUserByEmail(users[0].email, function (err, user) {
                should.not.exist(err);
                user.should.have.property('email', users[0].email);
                done();
            });
        });
    });

    describe("#findById()", function() {
        var testUser = {
            email: "jane@mail.mail",
            password: "pass"
        };
        it('should find user in database by id', function(done) {
            UserService.createUser(testUser.email, testUser.password, function(err, createdUser) {
                should.not.exist(err);
                UserService.findUserById(createdUser._id, function(err, user) {
                    should.not.exist(err);
                    user.should.have.property('email', testUser.email);
                    done();
                });
            });
        });
    });

});