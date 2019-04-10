import axios from 'axios'

// initial state
const state = {
    categories: []
}

// getters
const getters = {}

// actions
const actions = {
    getAllCategories ({ commit }) {
       axios.get(`http://localhost:8000/admin/ads/categories`).then(response=>{
           let categories=response.data.data.categories
           commit('setAdCategories',categories)
       })

    }
}

// mutations
const mutations = {
    setAdCategories (state, categories) {
        state.categories = categories
    }
}

export default {
    namespaced: true,    //命名空间
    state,
    getters,
    actions,
    mutations
}
