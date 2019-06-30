import Router from "vue-router"
import APIService from "./api/APIService"
import AppHome from "./components/pages/AppHome"
import AppLogin from "./components/pages/AppLogin"
import AppRegister from "./components/pages/AppRegister"
import AppLocations from "./components/pages/AppLocations"
import AppFavorites from "./components/pages/AppFavorites"


export default new Router ({
    //Defining routes
    routes: [
        {
            path: "/",
            name: "home",
            component: AppHome
        },
        {
            path: "/locations",
            name: "locations",
            component: AppLocations
        },
        {
            path: "/register",
            name: "register",
            component: AppRegister
        },
        {
            path: "/login",
            name:"login",
            component: AppLogin
        },
        {
            path: "/favorites",
            name: "favorites",
            component: AppFavorites,
            beforeEnter: (to, from, next) => {
                //Checking if the user is authenticated
                APIService.userIsAuthenticated()
                .then(() => {
                    next()
                })
                .catch(() => {
                    //If not we redirect him to login page
                    next({path: "/login"})
                })
            }
        }
    ]
})