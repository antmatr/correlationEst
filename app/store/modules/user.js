// initial state
const state = {
    id: null,
};

// getters
const getters = {
    id(state) {
        return state.id;
    },
};

// actions
const actions = {
};

// mutations
const mutations = {
    setId(state, newId) {
        state.id = newId;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
