const mode = document.body.getAttribute('data-app-mode') || 'x10';

// initial state
const state = {
    mode,
    items: {
        x10: {
            welcome: {
                component: 'step-welcome',
                props: {
                    texts: [
                        'text1 for x10 welcome-screen',
                        'text2 for x10 welcome-screen',
                    ],
                    nextStep: 'test1',
                },
            },
            test1: {
                component: 'step-test-x10',
                props: {
                    title: 'Test1',
                    description: 'Test1 description',
                    nextStep: 'test2',
                },
            },
            test2: {
                component: 'step-test-x10',
                props: {
                    title: 'Test2',
                    description: 'Test2 description',
                    nextStep: 'test3',
                },
            },
            test3: {
                component: 'step-test-x10',
                props: {
                    title: 'Test3',
                    description: 'Test3 description',
                    nextStep: 'results',
                    isFinal: true,
                },
            },
            results: {
                component: 'step-results',
                props: {},
            },
        },
        tables: {
            welcome: {
                component: 'step-welcome',
                props: {
                    texts: [
                        'text1 for tables welcome-screen',
                        'text2 for tables welcome-screen',
                    ],
                    nextStep: 'table1',
                },
            },
            tableSeries: [
                {
                    id: 1,
                    table1: {
                        component: 'step-test-table',
                        props: {
                            title: 'table1',
                            description: 'table1 description',
                            basicProbabilities: {
                                action: 0.7,
                                idleness: 0.4,
                            },
                            data: {
                                action: {
                                    success: 2,
                                    fail: 3,
                                },
                                idleness: {
                                    success: 1,
                                    fail: 4,
                                },
                            },
                            nextStep: 'table2',
                        },
                    },
                    table2: {
                        component: 'step-test-table',
                        props: {
                            title: 'table2',
                            description: 'table2 description',
                            basicProbabilities: {
                                action: 0.8,
                                idleness: 0.3,
                            },
                            data: {
                                action: {
                                    success: 2,
                                    fail: 0,
                                },
                                idleness: {
                                    success: 2,
                                    fail: 6,
                                },
                            },
                            nextStep: 'table3',
                        },
                    },
                    table3: {
                        component: 'step-test-table',
                        props: {
                            title: 'table3',
                            description: 'table3 description',
                            basicProbabilities: {
                                action: 0.9,
                                idleness: 0.2,
                            },
                            data: {
                                action: {
                                    success: 7,
                                    fail: 1,
                                },
                                idleness: {
                                    success: 0,
                                    fail: 2,
                                },
                            },
                            isFinal: true,
                            nextStep: 'results',
                        },
                    },
                },
            ],
            results: {
                component: 'step-results',
                props: {},
            },
        },
    },
    current: 'welcome',
};

// getters
const getters = {
    current(state, getters, rootState, rootGetters) {
        if (state.current === 'table1' || state.current === 'table2' || state.current === 'table3') {
            const id = rootState.user.id;
            const tableGroupById = state.items[mode].tableSeries[id - 1];
            return tableGroupById ? tableGroupById[state.current] : state.items[mode].tableSeries[0][state.current];
        }
        return state.items[mode][state.current];
    },
    mode(state) {
        return state.mode;
    },
};

// actions
const actions = {
};

// mutations
const mutations = {
    setStep(state, newStepTitle) {
        state.current = newStepTitle;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
