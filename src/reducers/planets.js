import {
    PLANETS_RECEIVED,
    RESIDENTS_RECEIVED,
} from '../constants.js';

export default (state = { list: [] }, action) => {
    switch (action.type) {
        case PLANETS_RECEIVED:
            return {
                ...state,
                list: action.json
            };
        case RESIDENTS_RECEIVED:            
            return {
                ...state,
                list: state.list.map((planet, i) => {
                    if (planet.name !== action.json.name) {
                        return planet;
                    } else {
                        return {
                            ...planet,
                            residentsInfo: action.json.residents
                        }
                    }
                })
            }
        default:
            return state;
    }
};