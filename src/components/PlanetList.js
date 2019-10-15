import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
  FETCH_BUTTON_CLICKED,
  PLANET_CLICKED
} from '../constants.js';
import Planet from './Planet';


export const fetchButtonClicked = (nextPage) => ({
  type: FETCH_BUTTON_CLICKED,
  nextPage
});
export const planetClicked = (name) => ({
  type: PLANET_CLICKED,
  name
});

const mapStateToProps = state => {
  return {
    planets: state.planets.pages[state.planets.currentPage] || []
  }
}
const mapDispatchToProps = dispatch => ({
  fetchButtonClicked: (nextPage) => () => dispatch(fetchButtonClicked(nextPage)),
  planetClicked: (name) => (event, isExpanded) => {
    if (isExpanded === true) {
      return dispatch(planetClicked(name));
    }
  }
});


const PlanetList = (props) =>
  <Container maxWidth="sm">
    <Typography variant="h3">Star Wars Planets</Typography>
    <Button
      variant="contained"
      color="primary"
      className="load-button"
      onClick={props.fetchButtonClicked(1)}>
      Load Planets
</Button>
    {props.planets.map((planet, i) =>
      <Planet key={planet.name}
        onChange={props.planetClicked(planet.name)}
        name={planet.name}
        climate={planet.climate}
        residents={planet.residentsInfo || []}
      />
    )}
  </Container>

export default connect(mapStateToProps, mapDispatchToProps)(PlanetList);