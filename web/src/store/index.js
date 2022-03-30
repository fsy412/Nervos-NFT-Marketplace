
import { createStore } from "vuex";

export default createStore({
    state: {
        account: ''
    },
    mutations: { // syncrous
        setAccount(state, account) {
            state.account = account
        },
    },
    actions: {
        // asyncronous
        async updateLoginAccount(state, payload) {
            // console.log("payload", payload.account)
            state.commit("setAccount", payload.account)
        },
    },
    modules: {},
    getters: {
        getAccount(state) {
            return state.account
        },
    }
});

