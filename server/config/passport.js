module.exports = function(app, db, User) {
    // Configuring Passport and express session
    const passport = require('passport')
    const expressSession = require('express-session')
    const LocalStrategy = require('passport-local').Strategy;
    const MongoStore = require("connect-mongo")(expressSession)
    const expressSecret = process.env.EXPRESS_SECRET || "expressSecretChangeThis"
    app.use(expressSession({
        secret: expressSecret,
        cookie: {
            maxAge: 1000 * 3600 * 12  //Setting max age of cookie to 12h
        },
        //Storing sessions in MongoDB (Avoiding problems with stocking it in memory)
        store: new MongoStore({
            mongooseConnection: db
        })
    })) 
    app.use(passport.initialize())
    app.use(passport.session())
    
    //Using passport local strategy to authenticate users via our local database
    passport.use(new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        //Finding the user with provided username
        User.findOne({ 'username' :  username },
        function(err, user) {
            if (err)
                return done(err)
            //Username does not exist
            if (!user){
                return done(null, false)
            }
            //Checking password matching
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err, false)
                }
                if (!isMatch) {
                    //Invalid password
                    return done(null, false)
                }
                //Valid password
                return done(null, user);
            })
        })
    }))
    //Passport serializing function used by passport
    passport.serializeUser(function(user, done) {
        done(null, user._id)
    })
    //Passport deserializing function used by passport
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
    //Middleware used to verify wether the user is authenticated or not
    const authMiddleware = (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(401).json({message: "You are not authenticated"})
        } else {
            return next()
        }
    }
    
    return {
        authMiddleware,
        passport
    }
}
