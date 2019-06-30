<template>
    <b-container>
        <div id="login-form-wrapper">
            <b-form @submit="submitLogin">
                <b-form-group
                id="username-input-group"
                label="Username: "
                label-for="username-input">
                    <b-form-input
                    id="username-input"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="Username"></b-form-input>
                </b-form-group>

                <b-form-group
                id="password-input-group"
                label="Password: "
                label-for="password-input">
                    <b-form-input
                    id="password-input"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Password"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </div>
    </b-container>
</template>

<script>

import APIService from "../../api/APIService"
import axios from "axios"

export default {
    name: "AppLogin",
    data: function() {
        return {
            form: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        //Submiting login formm
        submitLogin: function(e) {
            e.preventDefault()
            APIService.userLogin(this.form.username, 
            this.form.password)
            .then(() => {
                this.$emit("login")
                this.$router.push("/")
            })
            .catch(err => {
                if (err.response.status === 401) {
                    return this.$emit("error", "Invalid username or password")
                }
                this.$emit("error", err.message)
            })
        }
    }
}
</script>

<style scoped>
    #login-form-wrapper {
        background-color: white;
        padding: 30px;
        border-radius: 5px;
    }
</style>


