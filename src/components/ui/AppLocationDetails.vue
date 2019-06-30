<template>
    <div>
        <b-modal @shown="onShow" id="location-modal" size="xl" :title="row.name" hide-footer >
            <b-row>
                <b-col md4>
                    <img src="https://via.placeholder.com/300" :alt="row.name + ' image'">
                    <p id="details-sentence">{{ details }}</p>
                    <b-badge @click="toggleFavorite" href="#" :variant="row.favorite ? 'warning' : 'light'">Favorite</b-badge>
                </b-col>
                <b-col md6>
                    <h2>Residents</h2>
                    <div id="residents-table-wrapper">
                        <b-table
                        small
                        show-empty
                        :items="cachedResidents[this.row.id]"
                        :fields="fieldList"
                        :busy="showLoader"
                        @row-clicked="rowClicked">
                            <div slot="table-busy" class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                            <template slot="empty" >
                                There's nobody here :/
                            </template>

                        </b-table>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
        <app-character-details
        @update-favorites="$emit('character-update-favorites')"
        :character="selectedResident"
        modal-id="from-location-character-modal"></app-character-details>
        <!-- Setting custom ID to avoid conflict with favorites page -->
    </div>
</template>

<script>
import APIService from "../../api/APIService"
import AppCharacterDetails from "./AppCharacterDetails"

export default {
    components: {
        AppCharacterDetails
    },
    name: "AppLocationDetails",
    props: {
        row: Object
    },
    data: function() {
        return {
            cachedResidents: [],
            showLoader: false,
            fieldList: [
                "name",
                "species",
                "type",
                "gender",
                "status"
            ],
            selectedResident: {}
        }
    },
    computed: {
        //Formating planet details in one nice sentence
        details: function() {
            let type = this.row.type === "unknown" || this.row.type === undefined ? 
            ", unknown type" : 
            ", " + this.row.type

            let dimension = this.row.dimension === "unknown" || this.row.dimension === undefined ? 
            "an unknown dimension" : 
            this.row.dimension

            return `${this.row.name}${type} from ${dimension}`
        },

    },
    methods: {
        onShow: function() {
            //We check if the value already exists in cachedResidents so that
            //if the resident list of this location was previously shown we
            //won't request it again
            if (this.cachedResidents[this.row.id] === undefined) {
                let favoriteCharacters = null
                this.showLoader = true
                APIService.getCharacterListFromUrlList(this.row.residents)
                .then(response => {
                    this.$set(this.cachedResidents, this.row.id, response)
                    if (favoriteCharacters !== null) {
                        this.updateFavoriteCharacters(favoriteCharacters)
                    }
                    this.showLoader = false
                })
                .catch(err => {
                    //Show error to the user
                    this.showLoader = false
                })
                APIService.getFavoriteCharactersId()
                .then(response => {
                    favoriteCharacters = response
                    //If locations are already loaded
                    if (this.cachedResidents[this.row.id] !== undefined && 
                    this.cachedResidents[this.row.id].length > 0) {
                        this.updateFavoriteCharacters(favoriteCharacters)
                    }
                })
            }
        },
        updateFavoriteCharacters: function(favoriteCharacters) {
            if (Object.prototype.toString.call(favoriteCharacters) === "[object Array]") {
                favoriteCharacters.forEach(character => {
                    this.defineCharacterAsFavorite(character)
                })
            }
        },
        defineCharacterAsFavorite: function(id) {
            let index = this.cachedResidents[this.row.id].findIndex(character => {
                return character.id === id
            })
            if (index === -1) {
                return
            }
            this.cachedResidents[this.row.id][index].favorite = true
        },
        rowClicked(row) {
            //Showing resident details
            this.selectedResident = row
            this.$bvModal.show("from-location-character-modal")
        },
        toggleFavorite: function() {
            if (this.row.favorite) {
                return APIService.removeFavoriteLocation(this.row.id)
                .then(() => {
                    this.$set(this.row, "favorite", false)
                    //Emit event to inform parent that we changed favorites list
                    this.$emit("update-favorites")
                })
                .catch(err => {
                    //Show error to user
                    if (err.response.status === 401) {
                        //TODO: Add callback url
                        return this.$router.push("/login")
                    }
                    console.log(err)
                })
            }
            APIService.addFavoriteLocation(this.row.id)
            .then(() => {
                this.$set(this.row, "favorite", true)
                //Emit event to inform parent that we changed favorites list
                this.$emit("update-favorites")
            })
            .catch(err => {
                //Show error to user
                if (err.response.status === 401) {
                    //TODO: Add callback url
                    return this.$router.push("/login")
                }
                console.log(err)
            })
        }
    }


}
</script>

<style scoped>
    #details-sentence {
        max-width: 300px;
    }
    #residents-table-wrapper {
        max-height: 300px;
        overflow: auto;
    }
    #residents-table-wrapper >>> thead th {
        position: sticky;
        top: 0;
        background-color: white;
    }
    #residents-table-wrapper >>> tr {
        cursor: pointer;
    }
</style>


