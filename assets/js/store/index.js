import Vue from 'vue'
import Vuex from 'vuex'
import adCategories from './modules/adCategories'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        adCategories
    },
})
