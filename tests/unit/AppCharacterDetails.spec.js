import AppCharacterDetails from "@/components/ui/AppCharacterDetails"
import { shallowMount } from "@vue/test-utils"


describe("AppCharacterDetails.vue", () => {

    const stubs = {
        bModal: true,
        bCol: true,
        bRow: true,
        bBadge: true
    }
    //Testing "status" computed variable
    it("renders status correctly when known", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    status: "Alive"
                }
            },
            stubs
        })
        expect(wrapper.vm.status).toEqual("(Alive)")
    })
    it("renders status correctly when unknown", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    status: "unknown"
                }
            },
            stubs
        })
        expect(wrapper.vm.status).toEqual("")
    })
    //Testing "type" computed variable
    it("renders type correctly when known", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    type: "Type"
                }
            },
            stubs
        })
        expect(wrapper.vm.type).toEqual("Type")
    })
    it("renders type correctly when there are none", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    type: ""
                }
            },
            stubs
        })
        expect(wrapper.vm.type).toEqual("None")
    })
    //Testing "origin" computed variable
    it("renders origin correctly when known", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    origin: {
                        name: "origin"
                    }
                }
            },
            stubs
        })
        expect(wrapper.vm.origin).toEqual("Origin")
    })
    it("renders origin correctly when unknown", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    
                }
            },
            stubs
        })
        expect(wrapper.vm.origin).toEqual("Unknown")
    })
    //Testing "location" computed variable
    it("renders location correctly when known", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    location: {
                        name: "location"
                    }
                }
            },
            stubs
        })
        expect(wrapper.vm.location).toEqual("Location")
    })
    it("renders location correctly when unknown", () => {
        const wrapper = shallowMount(AppCharacterDetails, {
            propsData: {
                character: {
                    
                }
            },
            stubs
        })
        expect(wrapper.vm.location).toEqual("Unknown")
    })
})