const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config({path: __dirname + "/./../.env"})

//Enabling cors for developpement
if (process.env.NODE_ENV !== "production") {
    const enableCors = require("./config/enableCors")
    enableCors(app)
}


const port = process.env.SERVER_PORT || 3000
app.use(bodyParser.json())


//Configuring MongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/rickandmorty", {useNewUrlParser: true})
const db = mongoose.connection
//Importing MongoDB model
const User = require("./models/User.js")
//Importing passport configuration
const passportConfig = require("./config/passport")(app, db, User)
const passport = passportConfig.passport
const authMiddleware = passportConfig.authMiddleware

//Importing user account related routes
require("./routes/userAccountRoutes")(app, passport, User, authMiddleware)
//Importing user favorites related routes
require("./routes/userFavoritesRoutes")(app, authMiddleware)

//Serving frontend if in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname + "/../dist/")))
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname + "/../dist/index.html"))
    })
}

app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server listening on port ${port}`)
})