<template>
    <div>
        <h1 class="title">Favorites</h1>
        <b-container id="favorites-container">
            <b-row>
                <b-col>
                    <h2>Locations</h2>
                    <div id="location-table-wrapper" class="favorite-table-wrapper">
                        <b-table
                        small
                        show-empty
                        :items="favoriteLocations"
                        :fields="locationFields"
                        :busy="isLocationTableBusy"
                        :filter="locationTableFilter"
                        @row-clicked="locationTableRowClicked">
                            <div slot="table-busy" class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                            <template slot="empty">
                                You have no favorite locations. To define a location as favorite, open its details.
                            </template>
                        </b-table>
                    </div>
                </b-col>
                <b-col>
                    <h2>Characters</h2>
                    <div id="character-table-wrapper" class="favorite-table-wrapper">
                        <b-table
                        small
                        show-empty
                        :items="favoriteCharacters"
                        :fields="characterFields"
                        :busy="isCharacterTableBusy"
                        :filter="characterTableFilter"
                        @row-clicked="characterTableRowClicked">
                            <div slot="table-busy" class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                            <template slot="empty">
                                You have no favorite characters. To define a character as favorite, open its details.
                            </template>
                        </b-table>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <app-location-detail
        :row="selectedLocation"
        @update-favorites="updateLocationFavorites"
        @character-update-favorites="updateCharacterFavorites"
        @error="emitError"></app-location-detail>
        <app-character-detail
        :character="selectedCharacter"
        @update-favorites="updateCharacterFavorites"
        @error="emitError"
        modal-id="from-favorites-character-modal"></app-character-detail>

    </div>
</template>

<script>
import APIService from '../../api/APIService'
import AppLocationDetail from "../ui/AppLocationDetails"
import AppCharacterDetail from "../ui/AppCharacterDetails"

export default {
    components: {
        AppLocationDetail,
        AppCharacterDetail
    },
    name: "AppFavorites",
    data: function() {
        return {
            //locations data table fields
            locationFields: {
                name: {
                    label: "Name",
                    sortable: true
                }, 
                type: {
                    label: "Type",
                    sortable: true
                },
                dimension: {
                    label: "Dimension",
                    sortable: true
                }
            },
            //characters data table fields
            characterFields: {
                name: {
                    label: "Name",
                    sortable: true
                },
                type: {
                    label: "Type",
                    sortable: true
                },
                species: {
                    label: "Species",
                    sortable: true
                }
            },
            favoriteLocations: [],
            favoriteCharacters: [],

            isLocationTableBusy: false,
            isCharacterTableBusy: false,
            locationTableFilter: null,
            characterTableFilter: null,
            selectedLocation: {},
            selectedCharacter: {}
        }
    },
    mounted: function() {
        //Retrieving favorites
        this.updateLocationFavorites()
        this.updateCharacterFavorites()
    },
    methods: {
        locationTableRowClicked: function(row) {
            //Updating selected row and showing modal
            this.selectedLocation = row
            this.$bvModal.show("location-modal")
        },
        characterTableRowClicked: function(row) {
            //Updating selected row and showing modal
            this.selectedCharacter = row
            this.$bvModal.show("from-favorites-character-modal")
        },
        //Updating favorite locations
        updateLocationFavorites: function() {
            this.isLocationTableBusy = true
            APIService.getFavoritesLocations()
            .then(response => {
                this.favoriteLocations = response
                this.isLocationTableBusy = false
            })
            .catch(err => {
                this.$emit("error", "Error while retrieving location favorites")
            })
        },
        //Updating favorite characters
        updateCharacterFavorites: function() {
            this.isCharacterTableBusy = true
            APIService.getFavoritesCharacters()
            .then(response => {
                this.favoriteCharacters = response
                this.isCharacterTableBusy = false
            })
            .catch(err => {
                this.$emit("error", "Error while retrieving character favorites")
            })
        },
        //Transfering error to parent
        emitError: function(error) {
            this.$emit("error", error)
        }
    }
}
</script>

<style scoped>
    .row {
            height: 100%;
        }
    .favorite-table-wrapper {
        background-color: white;
        max-height: 80%;
        overflow: auto;
    }
    #favorites-container {
        height: 75vh;
        background-color: white;
        border-radius: 5px;
    }

    .favorite-table-wrapper >>> thead th {
        position: sticky;
        top: 0;
        background-color: white;
    }
    .favorite-table-wrapper >>> tr {
        cursor: pointer;
    }
</style>


