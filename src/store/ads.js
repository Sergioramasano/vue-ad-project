import firebase from 'firebase';
import fb from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
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
        ads: [],
    },
    mutations: {
        createNewAd(state, payload) {
            state.ads.push(payload)
        },
        setAds(state, payload) {
            state.ads = payload
        }
    },
    actions: {
        async createNewAd({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            const image = payload.image
            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    '',
                    payload.promo
                )

                const ad = await firebase.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
                let imageSrc = await fileData.ref.getDownloadURL()
                await fb.database().ref('ads').child(ad.key).update({
                    imageSrc
                })
                commit('setLoading', false)
                commit('createNewAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                })
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }

        },

        async fetchAds({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            const resultAds = []
            try {
                const fbVal = await firebase.database().ref('ads').once('value')
                const ads = fbVal.val();
                Object.keys(ads).forEach((key) => {
                    const ad = ads[key]
                    resultAds.push(new Ad(
                        ad.title,
                        ad.description,
                        ad.ownerId,
                        ad.imageSrc,
                        ad.promo,
                        key));
                })
                commit('setAds', resultAds)
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        }
    },
    getters: {
        ads: (state) => state.ads,
        promoAds: (state) => state.ads.filter(ad => ad.promo),
        myAds: (state) => state.ads,
    },
}