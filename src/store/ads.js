import firebase from 'firebase';
class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}
export default {
    state: {
        ads: [
            {
                title: "first ad",
                description: "descr",
                promo: false,
                imageSrc: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
                id: "qqq",
            },
            {
                title: "sec ad",
                description: "desc promo true r",
                promo: true,
                imageSrc: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
                id: "qqqa",
            },
            {
                title: "th ad",
                description: "descr wef dcw",
                promo: false,
                imageSrc: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
                id: "qqqss",
            },
        ],
    },
    mutations: {
        createNewAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        async createNewAd({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                console.log(getters);
                const newAd = new Ad(payload.title, payload.description, getters.user.id, payload.imageSrc, payload.promo)
                const fbValue = await firebase.database().ref('ads').push(newAd)
                console.log(fbValue);
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }

        },
    },
    getters: {
        ads: (state) => state.ads,
        promoAds: (state) => state.ads.filter(ad => ad.promo),
        myAds: (state) => state.ads,
    },
}