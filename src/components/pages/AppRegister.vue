<template>
    <b-container>
        <div id="register-form-wrapper">
            <b-form @submit="submitRegister">
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
                id="mail-input-group"
                label="Email address: "
                label-for="mail-input">
                    <b-form-input
                    id="mail-input"
                    v-model="form.mail"
                    type="email"
                    required
                    placeholder="Email address"></b-form-input>
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

                <b-form-group
                id="confirm-password-input-group"
                label="Confirm password: "
                label-for="confirm-password-input">
                    <b-form-input
                    id="confirm-password-input"
                    v-model="form.confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm password"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Create acount</b-button>
            </b-form>
        </div>
    </b-container>
</template>

<script>

import APIService from "../../api/APIService"

export default {
    name: "AppRegister",
    data: function() {
        return {
            form: {
                username: "",
                mail: "",
                password: "",
                confirmPassword: ""
            },
            matchingPasswords: true
        }
    },
    methods: {
        //Submitting new user data
        submitRegister: function(e) {
            e.preventDefault()
            if (this.password !== this.confirmPassword) {
                return this.$emit("error", "Passwords doesn't match")
            }
            APIService.userSignup(this.form.username,
            this.form.mail, 
            this.form.password, 
            this.form.confirmPassword)
            .then(() => {
                this.$router.push("/login")
                //TODO: Add confirmation message
            })
            .catch(err => {
                this.$emit("error", err.message)
            })
        }
    }
}
</script>

<style scoped>
    #register-form-wrapper {
        background-color: white;
        padding: 30px;
        border-radius: 5px;
    }
</style>


