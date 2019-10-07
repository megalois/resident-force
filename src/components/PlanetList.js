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


export const fetchButtonClicked = () => ({
  type: FETCH_BUTTON_CLICKED,
});
export const planetClicked = (name) => ({
  type: PLANET_CLICKED,
  name
});

const mapStateToProps = state => ({
  planets: state.planets.list
});
const mapDispatchToProps = dispatch => ({
  fetchButtonClicked: () => dispatch(fetchButtonClicked()),
  planetClicked: (name) => (event, isExpanded) => {
    if (isExpanded === true) {
      return dispatch(planetClicked(name));
    }
  }
});


class PlanetList extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Typography variant="h3">Star Wars Planets</Typography>
        <Button
          variant="contained"
          color="primary"
          className="load-button"
          onClick={this.props.fetchButtonClicked}>
          Load Planets
        </Button>
        {this.props.planets.map((planet, i) =>
          <Planet key={planet.name}
            onChange={this.props.planetClicked(planet.name)}
            name={planet.name}
            climate={planet.climate}
            residents={planet.residentsInfo || []}
          />
        )}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetList);