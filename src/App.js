import React from 'react';
import './App.css';
import PlanetList from './components/PlanetList';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <PlanetList />
        </header>
      </div>
    </Provider>
  );
}

export default App;
