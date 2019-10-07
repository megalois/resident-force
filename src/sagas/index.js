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

function* fetchPlanets() {
    const json = yield axios.get(SWAPI_URL + 'planets');
    yield put({ type: PLANETS_RECEIVED, json: json.data.results, });
}
function* fetchClickedWatcher() {
    yield takeLatest(FETCH_BUTTON_CLICKED, fetchPlanets)
}

function* fetchResidents(action) {
    let state = store.getState();
    let planet = state.planets.list.find((planet) => planet.name === action.name);
    if (planet.residentsInfo) {
        // Resident information is already stored
        return;
    }
    const residents = yield axios.all(
        planet.residents.map(residentUrl => axios.get(residentUrl))
    );
    const opened = {
        name: planet.name,
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
