import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
  FETCH_BUTTON_CLICKED,
  PLANET_CLICKED
} from '../constants.js';
import Planet from './Planet';
import { PLANETS_PER_PAGE } from '../constants.js';



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
    planets: state.planets.pages[state.planets.currentPage] || [],
    currentPage: state.planets.currentPage,
    count: state.planets.count,
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
      onClick={props.fetchButtonClicked(0)}>
      Load Planets
    </Button>
    <Box>
      <Button
        variant="contained"
        color="primary"
        className="load-button"
        disabled={props.currentPage === 0}
        onClick={props.fetchButtonClicked(props.currentPage - 1)}>
        Previous
    </Button>
      <Button
        variant="contained"
        color="primary"
        className="load-button"
        disabled={(props.currentPage + 1) === Math.ceil(props.count / PLANETS_PER_PAGE)}
        onClick={props.fetchButtonClicked(props.currentPage + 1)}>
        Next
    </Button>
    </Box>
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