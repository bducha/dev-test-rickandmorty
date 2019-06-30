module.exports = function(app, passport, User, authMiddleware) {
    //username and password parameters needs to be set in body parameters
    //for the passport authenticate method to work
    app.post('/api/login', 
    passport.authenticate('local'),
    (req, res) => {
        //Sending OK to client. 
        res.send()
    });
    app.get("/api/logout", (req, res) => {
        req.logout()
        res.send()
    })
    //Registering user
    //Take username, mail, password and confirmPassword as body parameters. They need to be strings
    app.post('/api/register', (req, res) => {
        //Checking params are well defined
        if (typeof req.body.username !== "string" || 
        typeof req.body.mail !== "string" ||
        typeof req.body.password !== "string" ||
        typeof req.body.confirmPassword !== "string") {
            return res.status(400).json({message: "Error in credentials format", body: req.body})
        }
        //Returning error if passwords does not match
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({message: "Passwords does not match"})
        }
        //TODO: Add password complexity verifications

        //Verifying if an account already exist with this username/mail
        User.find().or([{username: req.body.username}, {mail: req.query.mail}])
        .then(users => {
            if (Object.prototype.toString.call(users) === "[objet Array]" && users.length > 0) {
                return res.status(400).json({message: "Username or email address already in use"})
            }
            //Creating user
            createUser(req, res)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    //AuthMiddleware will return unauthorized status if the user isn't connected
    app.get("/api/userisauthenticated", authMiddleware, (req, res) => {
        res.send()
    })

    function createUser(req, res) {
        //Creating new user in mongodb
        let user = new User(
            {
                username: req.body.username,
                mail: req.body.mail, 
                password: req.body.password
            })
            //Saving new user to database
        user.save((err) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log("Error while creating user account : ", err)
                return res.status(500).json({message: "An error has occured while creating your account", details: err})
            }
            //Redirection is then handled by the client
            return res.send()
        })
    }
}

