import { put, takeLatest, all } from 'redux-saga/effects';
import {
    FETCH_BUTTON_CLICKED,
    PLANETS_RECEIVED,
    PLANET_CLICKED,
    RESIDENTS_RECEIVED,
    SWAPI_URL,
} from '../constants';
import axios from 'axios';
import store from '../store';

function* fetchPlanets(action) {
    const state = store.getState();
    let updatePage;
    let planetPage;
    let json;
    let count;
    if (state.pages && state.pages[action.nextPage].length === 0) {
        // Page already stored
        updatePage = false;
    } else {
        json = yield axios.get(SWAPI_URL + 'planets/?page=' + (action.nextPage + 1));
        planetPage = json.data.results;
        count = json.data.count;
        updatePage = true;
    }
    yield put({
        type: PLANETS_RECEIVED,
        updatePage,
        planetPage,
        count,
        nextPage: action.nextPage
    });
}
function* fetchClickedWatcher() {
    yield takeLatest(FETCH_BUTTON_CLICKED, fetchPlanets)
}

function* fetchResidents(action) {
    const state = store.getState();
    const currentPage = state.planets.currentPage;
    let planet = state.planets.pages[currentPage].find((planet) => planet.name === action.name);
    if (planet.residentsInfo) {
        // Resident information is already stored
        return;
    }
    const residents = yield axios.all(
        planet.residents.map(residentUrl => axios.get(residentUrl))
    );
    const opened = {
        name: action.name,
        residents
    }
    yield put({ type: RESIDENTS_RECEIVED, json: opened })
}
function* planetClickedWatcher() {
    yield takeLatest(PLANET_CLICKED, fetchResidents);
}

export default function* rootSaga() {
    yield all([
        fetchClickedWatcher(),
        planetClickedWatcher(),
    ]);
}
