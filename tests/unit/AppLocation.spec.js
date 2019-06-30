import AppLocation from "@/components/pages/AppLocations"
import { shallowMount } from "@vue/test-utils"


describe("AppLocation.vue", () => {

    const stubs = {
        bModal: true,
        bCol: true,
        bRow: true,
        bTable: true,
        bSpinner: true,
        bFormInput: true,
        bInputGroup: true,
        bFormGroup: true
    }

    //Testing "definelocationAsFavorite" method
    it("update correctly location to be favorite", () => {
        const wrapper = shallowMount(AppLocation, {
            stubs
        })
        wrapper.vm.items= [
                {id: 123, name: "TestLocation 0"},
                {id: 42, name: "TestLocation 1"}
        ]
        wrapper.vm.defineLocationAsFavorite(42)
        expect(wrapper.vm.items[1].favorite).toEqual(true)
        expect(wrapper.vm.items[0].favorite).toEqual(undefined)
    })
    //Testing "updateFavoritelocations" method
    it("update correctly a list of locations to be favorite", () => {
        const wrapper = shallowMount(AppLocation, {
            stubs
        })
        wrapper.vm.items = [
            {id: 123, name: "TestLocation 0"},
            {id: 42, name: "TestLocation 1"},
            {id: 56, name: "TestLocation 3"},
            {id: 12, name: "TestLocation 4"},
            {id: 59, name: "TestLocation 5"},
        ]
        wrapper.vm.updateFavoriteLocations([123, 56, 99])
        expect(wrapper.vm.items[0].favorite).toEqual(true)
        expect(wrapper.vm.items[1].favorite).toEqual(undefined)
        expect(wrapper.vm.items[2].favorite).toEqual(true)
        expect(wrapper.vm.items[3].favorite).toEqual(undefined)
        expect(wrapper.vm.items[4].favorite).toEqual(undefined)
    })
})