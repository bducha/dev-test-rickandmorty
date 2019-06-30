module.exports = function(app, authMiddleware) {
    //Sending favorite locations to user
    app.get("/api/getfavoritelocations", authMiddleware, (req, res) => {
        res.json(req.user.favoriteLocations)
    })
    //sending favorite characters to user
    app.get("/api/getfavoritecharacters", authMiddleware, (req, res) => {
        res.json(req.user.favoriteCharacters)
    })
    //adding favorite location to user
    //Take location in body parameters: id of the to-be-favorite location
    app.post("/api/addfavoritelocation", authMiddleware, (req, res) => {
        //Verifying input data
        if (typeof req.body.location !== "number") {
            return res.status(400).send({message: "Location parameter needs to be a number"})
        }
        //Return error if location is already in favorites
        if (req.user.favoriteLocations.find((location => {
            return location === req.body.location
        }))) {
            return res.status(400).send({message: "This location is already in favorites"})
        }
        //Adding location ID to user's favorite locations list
        req.user.favoriteLocations.push(req.body.location)
        //Saving user model to database
        req.user.save(err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log("Error while adding favorite location to user")
                return res.status(500).send({message: "Error while adding favorite location to user", details: err})
            }
            return res.send()
        })
    })
    //Removing location from favorites
    //taking location in body parameters: id of the to-be-removed favorite location
    app.post("/api/removefavoritelocation", authMiddleware, (req, res) => {
        //Verifying input data
        if (typeof req.body.location !== "number") {
            return res.status(400).send({message: "Location parameter needs to be a number"})
        }
        let index = req.user.favoriteLocations.findIndex(location => {
            return location === req.body.location
        })
        //Returning an error if the location isn't in favorites
        if (index === -1) {
            return res.status(404).send({message: "Location not in favorites"})
        }
        //Removing favorite location from array
        req.user.favoriteLocations.splice(index, 1)
        //Saving user
        req.user.save(err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log("Error while adding favorite location to user")
                return res.status(500).send({message: "Error while adding favorite location to user", details: err})
            }
            return res.send()
        })
    })
    //adding favorite character to user
    //Take character in body parameters: id of the to-be-favorite character
    app.post("/api/addfavoritecharacter", authMiddleware, (req, res) => {
        //Verifying input data
        if (typeof req.body.character !== "number") {
            return res.status(400).send({message: "Character parameter needs to be a number"})
        }
        //Adding location ID to user's favorite character list
        req.user.favoriteCharacters.push(req.body.character)
        //Saving changes to database
        req.user.save(err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log("Error while adding favorite character to user")
                return res.status(500).send({message: "Error while adding favorite character to user", details: err})
            }
            return res.send()
        })
    })
    //Removing character from favorites
    //taking character in body parameters: id of the to-be-removed favorite character
    app.post("/api/removefavoritecharacter", authMiddleware, (req, res) => {
        //Verifying input data
        if (typeof req.body.character !== "number") {
            return res.status(400).send({message: "Character parameter needs to be a number"})
        }
        let index = req.user.favoriteCharacters.findIndex(character => {
            return character === req.body.character
        })
        //Returning an error if the character isn't in favorites
        if (index === -1) {
            return res.status(404).send({message: "Character not in favorites"})
        }
        //Removing favorite location from array
        req.user.favoriteCharacters.splice(index, 1)
        //Saving user
        req.user.save(err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log("Error while adding favorite character to user")
                return res.status(500).send({message: "Error while adding favorite character to user", details: err})
            }
            return res.send()
        })
    })
}