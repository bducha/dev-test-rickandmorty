import App from "@/App.vue"
import { mount } from "@vue/test-utils"

const stubs = {
    bNavbar: true,
    bNavbarToggle: true,
    bCollapse: true,
    bNavbarNav: true,
    bNavItem: true,
    bAlert: true,
    routerLink: true,
    routerView: true
}
describe("App.vue", () => {
    it("renders navbar when route isn't /home", () => {
        const $route = {
            name: "location"
        }
        const wrapper = mount(App, {
            mocks: {
                $route
            },
            stubs
        })
        expect(wrapper.vm.showNav).toEqual(true)
    })

    it("doesn't render navbar when route is /home", () => {
        const $route = {
            name: "home"
        }
        const wrapper = mount(App, {
            mocks: {
                $route
            },
            stubs
        })
        expect(wrapper.vm.showNav).toEqual(false)
    })
})