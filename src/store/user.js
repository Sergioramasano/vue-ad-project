import firebase from 'firebase';

class User {
    constructor(uid) {
        this.id = uid;
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        // ---------with Promises------

        // registerUser({ commit }, { email, password }) {
        //     commit('clearError')
        //     commit('setLoading', true)
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(user => {
        //         commit('setUser', new User(user.uid))
        //         commit('setLoading', false)
        //     }).catch((e) => {
        //         commit('setLoading', false)
        //         commit('clearError', e.message)
        //     })
        // }

        // ---------with async await sugar------

        async registerUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            try {
                commit('setUser', new User(user.user.uid))
                commit('setLoading', false)
            } catch (e) {
                commit('setError', null)
                commit('setLoading', false)
                throw e
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            try {
                commit('setUser', new User(user.user.uid))
                commit('setLoading', false)

            } catch (e) {
                commit('setError', null)
                commit('setLoading', false)
                throw e
            }
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', new User(payload.uid));
        },
        logoutUser({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null);
        }
    },
    getters: {
        user: (state) => state.user,
        isUserLoggedIn: (state) => state.user !== null,
    },
}