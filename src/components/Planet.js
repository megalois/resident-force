import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Planet = (props) =>
  <ExpansionPanel onChange={props.onChange}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant="h4" className={props.climate.includes('tropical') ? 'hot' : ''}>{props.name}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className='planet-details'>
      {
        props.residents.length !== 0 ?
          props.residents.map((resident, i) =>
            <Paper key={resident.data.name} className='resident'>
              <Typography variant="h5">
                {resident.data.name}
              </Typography>
            </Paper>
          ) :
          <Typography variant="h5">Nobody lives here</Typography>
      }
    </ExpansionPanelDetails>
  </ExpansionPanel>

export default Planet;