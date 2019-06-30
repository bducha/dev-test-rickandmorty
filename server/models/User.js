const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

//Creating user Schema
const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    //Storing mail for future password recovery, mail confirmations
    mail: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    //Storing favorites in array
    favoriteLocations: { type: Array },
    favoriteCharacters: { type: Array },
})

UserSchema.pre('save', function(next) {
    let user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

//Check password validity
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
        //isMatch is true or false according to compare result
    })
}


module.exports = mongoose.model('User', UserSchema)

//Source : https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1