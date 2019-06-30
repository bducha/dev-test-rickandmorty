<template>
    <b-modal :id="modalId" size="xl" :title="character.name" hide-footer >
            <b-row>
                <b-col md4>
                    <img :src="character.image" :alt="character.name + ' image'">
                    <p></p>
                    <b-badge @click="toggleFavorite" href="#" :variant="character.favorite ? 'warning' : 'light'">Favorite</b-badge>
                </b-col>
                <b-col md6>
                    <p>{{ character.name }} {{ status }}</p>
                    <p>Gender: {{ firstCharToUpper(character.gender) }}</p>
                    <p>Species: {{ firstCharToUpper(character.species) }}</p>
                    <p>Type: {{ type }}</p>
                    <p>Origin: {{ origin }}</p>
                    <p>Location: {{ location }}</p>
                </b-col>
            </b-row>
        </b-modal>
</template>

<script>

import APIService from "../../api/APIService"

export default {
    name: "AppCharacterDetails",
    props: {
        character: Object,
        modalId: String
    },
    computed: {
        //Formating data
        status: function() {
            if (this.character.status !== undefined && this.character.status !== "unknown") {
                return `(${this.character.status})`
            }
            return ""
        },
        type: function() {
            if (this.character.type !== undefined && this.character.type !== "") {
                return this.character.type
            }
            return "None"
        },
        origin: function() {
            if (this.character.origin !== undefined) {
                return this.firstCharToUpper(this.character.origin.name)
            }
            return "Unknown"
        },
        location: function() {
            if (this.character.location !== undefined) {
                return this.firstCharToUpper(this.character.location.name)
            }
            return "Unknown"
        }
    },
    methods: {
        firstCharToUpper: function(str) {
            if (typeof str !== 'string') {
                return ''
            }
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        toggleFavorite: function() {
            if (this.character.favorite) {
                return APIService.removeFavoriteCharacter(this.character.id)
                .then(() => {
                    this.$set(this.character, "favorite", false)
                    //Emit event to inform parent that we changed favorites list
                    this.$emit("update-favorites")
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        //TODO: Add callback url
                        return this.$router.push("/login")
                    }
                    this.$emit("error", "Error while removing favorite character")
                })
            }
            APIService.addFavoriteCharacter(this.character.id)
            .then(() => {
                this.$set(this.character, "favorite", true)
                //Emit event to inform parent that we changed favorites list
                this.$emit("update-favorites")
            })
            .catch(err => {
                if (err.response.status === 401) {
                    //TODO: Add callback url
                    return this.$router.push("/login")
                }
                this.$emit("error", "Error while adding favorite character")
            })
        }
    }

}
</script>


