<template>
<div>
  <div id="bg-image"></div>
  <div id="app">
      <b-navbar v-show="showNav" toggleable="lg" type="light" variant="light" id="navbar">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/locations">Locations</router-link></b-nav-item>
            <b-nav-item><router-link to="/favorites">Favorites</router-link></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-show="!isAuthenticated"><router-link to="/register">Register</router-link></b-nav-item>
            <b-nav-item v-show="!isAuthenticated"><router-link to="/login">Log in</router-link></b-nav-item>
            <b-nav-item @click="logout" v-show="isAuthenticated">Log out</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    <!-- Displaying wanted view -->
    <b-alert class="error-alert"
    :show="dismissCountdown"
    dismissbile
    variant="danger"
    @dismissed="dismissCountdown=0">
    {{ error }}
    </b-alert>
    <router-view 
    @login="login"
    @error="showError"
    :is-authenticated="isAuthenticated"></router-view>
  </div>
</div>
</template>

<script>
import axios from "axios"
import APIService from './api/APIService';

export default {
  mounted: function() {
    //checking if the user is authenticated and updating the property
    APIService.userIsAuthenticated()
    .then(() => {
      this.isAuthenticated = true
    })
  },
  name: 'app',
  data: function() {
    return {
      isAuthenticated: false,
      errorDuration: 5,
      dismissCountdown: 0,
      error: "Error"
    }
  },
  computed: {
    //Hiding navbar if we are at homepage
    showNav: function() {
      return this.$route.name !== "home"
    }
  },
  methods: {
    //Asking server to log user out
    logout: function(){
      APIService.userLogout()
      .then(() => {
        this.$router.push("/")
        this.isAuthenticated = false
      })
      .catch(err => {
        showError("Error while logging you out")
        console.log(err)
      })
    },
    login: function() {
      this.isAuthenticated = true
    },
    showError: function(error) {
      this.error = error
      this.dismissCountdown = this.errorDuration
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif
  }
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  #bg-image {
    z-index: -1;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: url("~@/assets/background.jpg");
    background-size: cover;
    background-position-x: center;
    background-repeat: no-repeat;
    filter: blur(5px);
    /* transform: scale(1.05); Avoid white borders because of the blur */
  }
  #navbar a{
    color: rgba(0, 0, 0, 0.5);
  }
  #navbar a:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  #navbar a:visited {
    color: rgba(0, 0, 0, 0.5);
  }
  .router-link-exact-active {
     text-decoration: underline;
  }
  .title {
	  	color: white;
        font-family: 'Roboto';
        text-align: center;
        letter-spacing: 2px;
        text-shadow: 0 0 7px rgb(0,0,0,0.5);
  }
</style>
