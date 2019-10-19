// initial state
const state = {
    items: [],
};

// getters
const getters = {
    items(state) {
        return state.items;
    },
};

// actions
const actions = {
};

// mutations
const mutations = {
    pushItem(state, newItem) {
        state.items.push(newItem);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
