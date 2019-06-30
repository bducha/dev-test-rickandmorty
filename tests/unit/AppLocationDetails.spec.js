import AppLocationDetails from "@/components/ui/AppLocationDetails"
import { shallowMount } from "@vue/test-utils"


describe("AppLocationDetails.vue", () => {

    const stubs = {
        bModal: true,
        bCol: true,
        bRow: true,
        bBadge: true,
        bTable: true,
        bSpinner: true
    }
    //Testing "details" computed variable
    it("renders correctly details phrase when all fields are defined", () => {
        const wrapper = shallowMount(AppLocationDetails, {
            stubs,
            propsData: {
                row: {
                    name: "Name", 
                    type: "Type",
                    dimension: "dimension"
                }
            }
        })
        expect(wrapper.vm.details).toEqual("Name, Type from dimension")
    })
    it("renders correctly details phrase when type is unknown", () => {
        const wrapper = shallowMount(AppLocationDetails, {
            stubs,
            propsData: {
                row: {
                    name: "Name", 
                    type: "unknown",
                    dimension: "dimension"
                }
            }
        })
        expect(wrapper.vm.details).toEqual("Name, unknown type from dimension")
    })
    it("renders correctly details phrase when type and dimension are unknown", () => {
        const wrapper = shallowMount(AppLocationDetails, {
            stubs,
            propsData: {
                row: {
                    name: "Name", 
                    type: "unknown",
                    dimension: "unknown"
                }
            }
        })
        expect(wrapper.vm.details).toEqual("Name, unknown type from an unknown dimension")
    })
    //Testing "defineCharacterAsFavorite" method
    it("update correctly resident to be favorite", () => {
        const wrapper = shallowMount(AppLocationDetails, {
            stubs,
            propsData: {
                row: {id: 0}
            }
        })
        wrapper.vm.cachedResidents= [
            [
                {id: 123, name: "TestResident 0"},
                {id: 42, name: "TestResident 1"}
            ]
        ]
        wrapper.vm.defineCharacterAsFavorite(42)
        expect(wrapper.vm.cachedResidents[0][1].favorite).toEqual(true)
        expect(wrapper.vm.cachedResidents[0][0].favorite).toEqual(undefined)
    })
    //Testing "updateFavoriteCharacters" method
    it("update correctly a list of characters to be favorite", () => {
        const wrapper = shallowMount(AppLocationDetails, {
            stubs,
            propsData: {
                row: {id: 0}
            }
        })
        wrapper.vm.cachedResidents = [
            [
                {id: 123, name: "TestResident 0"},
                {id: 42, name: "TestResident 1"},
                {id: 56, name: "TestResident 3"},
                {id: 12, name: "TestResident 4"},
                {id: 59, name: "TestResident 5"},
            ]
        ]
        wrapper.vm.updateFavoriteCharacters([123, 56, 99])
        expect(wrapper.vm.cachedResidents[0][0].favorite).toEqual(true)
        expect(wrapper.vm.cachedResidents[0][1].favorite).toEqual(undefined)
        expect(wrapper.vm.cachedResidents[0][2].favorite).toEqual(true)
        expect(wrapper.vm.cachedResidents[0][3].favorite).toEqual(undefined)
        expect(wrapper.vm.cachedResidents[0][4].favorite).toEqual(undefined)
    })
})