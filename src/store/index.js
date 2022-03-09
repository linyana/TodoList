import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    color: 'rgb(103, 103, 184)'
}

export default new Vuex.Store({
    state,
    mutations: {
        ChangeBlue() {
            this.state.color = 'rgb(103, 103, 184)'
        },
        ChangeGreen() {
            this.state.color = 'seagreen'
        },
        ChangeRed() {
            this.state.color = 'rgb(199, 106, 106)'
        },
        ChangeYellow() {
            this.state.color = 'rgb(224, 221, 11)'
        }
    }
})