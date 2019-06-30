<template>
    <div>
        <h1 class="title">Locations</h1>
        <div id="table-wrapper">
            <b-row class="pt-3 mb-2 ml-2">
                <b-col md="4">
                    <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Location, type, dimension"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <div id="locations-table-wrapper">
                <b-table
                small
                :items="items"
                :fields="fields"
                :busy="isBusy"
                :filter="filter"
                @row-clicked="rowClicked">

                    <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>

                    <template slot="residentCount" slot-scope="row">
                        {{ row.item.residents.length }}
                    </template>

                    <template slot="dimension" slot-scope="row">
                        {{ firstCharToUpper(row.item.dimension) }}
                    </template>

                    <template slot="type" slot-scope="row">
                        {{ firstCharToUpper(row.item.type) }}
                    </template>

                </b-table>
            </div>
        </div>
        <app-location-details
        :row="selectedRow"
        @error="emitError"></app-location-details>
    </div>
</template>

<script>


import APIService from "../../api/APIService"
import AppLocationDetails from "../ui/AppLocationDetails.vue"

export default {
    components: {
        AppLocationDetails
    },
    name: "AppLocations",
    data: function() {
        return {
            isBusy: true,
            items: [],
            //Location data table fields
            fields: {
                id: {
                    label: "ID",
                    sortable: true
                },
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
                },
                residentCount: {
                    label: "Resident count"
                }
            },
            //table filter
            filter: null,
            selectedRow: {}
            
        }
    },
    props: {
        //To know if user is authenticated or not
        isAuthenticated: Boolean
    },
    mounted() {
        this.getAllLocations()
    },
    methods: {
        //Getting all locations an favorites id the user is connected
        getAllLocations: async function() {
            let favoriteLocations = null
            APIService.getLocations()
            .then(response => {
                if (response !== undefined) {
                    
                    this.items = response
                    //If favorites are already loaded
                    if (favoriteLocations !== null) {
                        this.updateFavoriteLocations(favoriteLocations)
                    }
                    //Hiding loader
                    this.isBusy = false
                }
            })
            .catch(err => {
                this.$emit("error", "Error while retrieving locations")
                this.isBusy = false
            })
            //if the user is connected we get his favorite locations
            if (this.isAuthenticated) {
                APIService.getFavoriteLocationsId()
                .then(response => {
                    favoriteLocations = response
                    //If locations are already loaded
                    if (this.items.length > 0) {
                        this.updateFavoriteLocations(favoriteLocations)
                    }
                })
                .catch(err => {
                    this.$emit("error", "Error while retrieving favorite locations")
                })
            }
        },
        rowClicked(row) {
            //Showing location details
            this.selectedRow = row
            this.$bvModal.show("location-modal")
        },
        firstCharToUpper: function(str) {
            if (typeof str !== 'string') {
                return ''
            }
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        //Looping over favorite locations to define each one in the location list as favorite
        //takes array of favorite locations ids
        updateFavoriteLocations: function(favoriteLocations) {

            if (Object.prototype.toString.call(favoriteLocations) === "[object Array]") {
                favoriteLocations.forEach(location => {
                    this.defineLocationAsFavorite(location)
                })
            }
        },
        //Define a location as favorite by it's id
        defineLocationAsFavorite: function(id) {
            let index = this.items.findIndex(location => {
                return location.id === id
            })
            if (index === -1) {
                return
            }
            this.items[index].favorite = true
            
        },
        //Transfering error to parent
        emitError: function(error) {
            this.$emit("error", error)
        }
    }
    
}
</script>

<style scoped>
    #locations-table-wrapper {
        background-color: white;
        width: 95%;
        max-height: 80%;
        overflow: auto;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    #locations-table-wrapper >>> thead th {
        position: sticky;
        top: 0;
        background-color: white;
    }
    #table-wrapper {
        background-color: white;
        width: 95vw;
        margin-left: 50vw;
        transform: translateX(-50%);
        border-radius: 5px;
        height: 80vh;
    }
    #locations-table-wrapper >>> tbody tr {
        cursor: pointer;
    }
</style>


