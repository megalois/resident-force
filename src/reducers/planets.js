import {
    PLANETS_RECEIVED,
    RESIDENTS_RECEIVED,
    PLANETS_PER_PAGE,
} from '../constants.js';

/**
planets:
currentPage: 1,
pages: [
    [planet1, planet2, ...],
    [planet11, planet12, ...],
]
*/

export default (state = { pages: [], currentPage: 0 }, action) => {
    switch (action.type) {
        case PLANETS_RECEIVED:
            const numberOfPages = Math.ceil(action.count / PLANETS_PER_PAGE);
            const emptyPages = new Array(numberOfPages).fill([]);
            const newPages = emptyPages.map((page, i) => {
                if (action.updatePage && i === action.nextPage) {
                    return action.planetPage;
                } else if (state.pages[i] && state.pages[i].length !== 0) {
                    return state.pages[i];
                } else {
                    return page;
                }
            })
            return {
                ...state,
                pages: newPages,
                currentPage: action.nextPage,
            };
        case RESIDENTS_RECEIVED:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [state.currentPage]: state.pages[state.currentPage].map((planet) => {
                        if (planet.name === action.json.name) {
                            return {
                                ...planet,
                                residentsInfo: action.json.residents
                            }
                        } else {
                            return planet;
                        }
                    })
                }
            }
        default:
            return state;
    }
}