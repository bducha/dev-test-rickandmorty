import axios from "axios"

const RICKMORTY_API_URL = process.env.VUE_APP_RICKMORTY_API_URL || "https://rickandmortyapi.com/api/"
const BACKEND_API_URL = process.env.NODE_ENV === "production" ? "/api/" : process.env.VUE_APP_BACKEND_API_URL || "http://localhost:3000/api"
//Configuring axios
const backendAPI = axios.create({
    baseURL: BACKEND_API_URL,
    withCredentials: true
  });
export default class APIService {
    //Send addfavoritecharacter request to the server
    //Takes id: Number in parameter
    static addFavoriteCharacter(id) {
        return new Promise((resolve, reject) => {
            backendAPI.post("addfavoritecharacter", {character: id})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Send removefavoritecharacter request to the server
    //Takes id: Number in parameter
    static removeFavoriteCharacter(id) {
        return new Promise((resolve, reject) => {
            backendAPI.post("removefavoritecharacter", {character: id})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Send addfavoritelocation request to the server
    //Takes id: Number in parameter
    static addFavoriteLocation(id) {
        return new Promise((resolve, reject) => {
            backendAPI.post("addfavoritelocation", {location: id})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Send removefavoritelocation request to the server
    //Takes id: Number in parameter
    static removeFavoriteLocation(id) {
        return new Promise((resolve, reject) => {
            backendAPI.post("removefavoritelocation", {location: id})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Sending register query to the server
    //Takes username, mail, password and confirmPassword as string parameters
    static userSignup(username, mail, password, confirmPassword) {
        return new Promise((resolve, reject) => {
            if (typeof username !== "string" || username === "" ||
            typeof mail !== "string" || mail === "" ||
            typeof password !== "string" || password === "" ||
            typeof confirmPassword !== "string" || confirmPassword === "") {
                return reject({message: "All fields are required"})
            }
            if (password !== confirmPassword) {
                return reject({message: "Passwords does not match"})
            }
            backendAPI.post("register", {
                username,
                mail,
                password,
                confirmPassword
            })
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Send login request to the server
    //Takes username and password as string parameters
    static userLogin(username, password) {
        return new Promise((resolve, reject) => {
            if (typeof username !== "string" || username === "" ||
            typeof password !== "string" || password === "") {
                return reject({message: "All fields are required"})
            }
            backendAPI.post("login", {
                username,
                password,
            })
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Sending logout request to the server
    static userLogout() {
        return new Promise((resolve, reject) => {
            backendAPI.get("logout")
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject({message: "Error while trying to log out", details: err})
            })
        })
    }
    //Asking the server if the client is authenticated
    static userIsAuthenticated() {
        return new Promise((resolve, reject) => {
            backendAPI.get("userisauthenticated")
            .then(() => {
                return resolve()
            })
            .catch(err => {
                if (err.response.status === 401) {
                    return reject({message: "You are not authenticated", status: 401}) 
                }
                reject({message: "An error occured while trying to authenticate you"})
            })
        })
    }
    //Asking the server favorite locations for the connected user
    static getFavoriteLocationsId() {
        return new Promise((resolve, reject) => {
            backendAPI.get("getfavoritelocations")
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Getting favorite locations ids from the server and requesting those
    //to the rickandmorty API
    static getFavoritesLocations() {
        return new Promise((resolve, reject) => {
            //requesting favorites to the server
            this.getFavoriteLocationsId()
            .then(response => {
                if (response.length === undefined || response.length <= 0) {
                    return resolve([])
                }
                //Getting those locations from the rickandmorty api
                axios.get(RICKMORTY_API_URL + "location/" + response)
                .then(response => {
                    if (Object.prototype.toString.call(response.data) === "[object Array]") {
                        //Setting favorite variable for each location for the view
                        response.data.forEach(location => {
                            location.favorite = true
                        })
                        return resolve(response.data)
                    }
                    //Setting favorite variable for the view
                    response.data.favorite = true
                    //If we query for a single location tbe API will send back an
                    //object so we need to put it in an array
                    return resolve([response.data])
                })
                .catch(err => {
                    return reject({message: "An error occured while retrieving favorites locations from rickmortyAPI", details: err})
                })
            })
            .catch(err => {
                return reject({message: "An error occured while retriving favorites locations", details: err})
            })
        })
    }
    //Asking the server favorite characters for the connected user
    static getFavoriteCharactersId() {
        return new Promise((resolve, reject) => {
            backendAPI.get("getfavoritecharacters")
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    //Getting favorite characters ids from the server and requesting those
    //to the rickandmorty API
    static getFavoritesCharacters() {
        return new Promise((resolve, reject) => {
            //requesting favorites to the server
            this.getFavoriteCharactersId()
            .then(response => {
                if (response.length === undefined || response.length <= 0) {
                    return resolve([])
                }
                //Getting those characters from the rickandmorty api
                axios.get(RICKMORTY_API_URL + "character/" + response)
                .then(response => {
                    if (Object.prototype.toString.call(response.data) === "[object Array]") {
                        //Setting favorite variable for each location for the view
                        response.data.forEach(character => {
                            character.favorite = true
                        })
                        return resolve(response.data)
                    }
                    //Setting favorite variable for the view
                    response.data.favorite = true
                    //If we query for a single location tbe API will send back an
                    //object so we need to put it in an array
                    return resolve([response.data])
                })
                .catch(err => {
                    return reject({message: "An error occured while retrieving favorites character from rickmortyAPI", details: err})
                })
            })
            .catch(err => {
                return reject({message: "An error occured while retriving favorites character", details: err})
            })
        })
    }
    //Get all locations
    static getLocations() {
        //TODO: Add custom locations
        return new Promise((resolve, reject) => {
            this.getBaseLocations([], resolve, reject)
        })
    }

    //Getting all locations recursively from all pages to then add easily custom locations
    //https://itnext.io/how-to-get-resources-from-paginated-rest-api-d7c20fe2bb0b
    //Takes locations array for the recursive function, resolve and reject as well as
    //next parameter if it's not the last page
    static getBaseLocations(locations, resolve, reject, next = undefined) {
        axios.get(next || RICKMORTY_API_URL + "location")
        .then(response => {
            if (response.status !== 200 || Object.prototype.toString.call(response.data.results) !== '[object Array]') {
                return reject({message: "An error has occured while retrieving locations", details: response.data})
            }
            const retrivedLocations = locations.concat(response.data.results)
            if (typeof response.data.info === "object" && typeof response.data.info.next === "string" && response.data.info.next === "") {
                //Last page
                return resolve(retrivedLocations)
            }
            //Isn't the last page so calling getBaseLocations() again with next page URL
            this.getBaseLocations(retrivedLocations, resolve, reject, response.data.info.next)
        })
        .catch(err => {
            reject({message: "An error has occured while retrieving locations", details: err})
        })
    }
    //Here we don't need to get recursively characters because by passing an array
    //of IDs in query we get a non-paginated results array from the API.
    //takes a characters URL list in parameters
    static getCharacterListFromUrlList(characters) {
        //TODO: Add custom characters
        return new Promise((resolve, reject) => {
            if (Object.prototype.toString.call(characters) !== '[object Array]') {
                return reject({message: `Expected an array, got ${Object.prototype.toString.call(characters)} instead`})
            }
            let list = characters.filter(char => {
                //Filtering to avoid getting wrong values if url is malformed
                //TODO: putting custom characters in a separated list 
                //(checking the url?)
                return !isNaN(
                    parseInt(
                        char.slice(
                            char.lastIndexOf("/") + 1
                        )
                    )
                )
            })
            //And then mapping the current URL array to get a number array
            .map(char => 
                parseInt(
                    char.slice(
                        char.lastIndexOf("/") + 1
                    )
                )
            )
            if (list.length === 0) {
                return resolve([])
            }
            //Passing character array in query parameters
            axios.get(RICKMORTY_API_URL + "character/" + list)
            .then(response => {
                if (response.status !== 200) {
                    return reject({message: "An error occured while retrieving characters", details: response})
                }
                //If there is only one record the API return a single object so we
                //put it in a array to avoid problems with the view
                if (list.length === 1) {
                    return resolve([response.data])
                }
                return resolve(response.data)
            })
            .catch(err => {
                return reject({message: "An error has occured while retrieving characters", details: err})
            })
        })
    }

}