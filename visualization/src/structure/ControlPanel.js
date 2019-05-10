import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/lab/Slider';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  slider: {
    padding: '22px 0px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sliders:{
    width: '66%',
    display: 'inline-block',
  },
  buttons: {
    width: '33%',
    display: 'inline-block',
  }
});

class ControlPanel extends React.Component {

  render() {
    const { classes, paramName, handleFormChange, handleSliderChange, panels } = this.props;

    return (
      <Paper className={classes.paper}>
          <div class={classes.sliders}>
            <Slider
              classes={{ container: classes.slider }}
              value={panels[paramName].min}
              aria-labelledby="label"
              onChange={handleSliderChange('min', paramName)}
            />
            <Slider
              classes={{ container: classes.slider }}
              value={panels[paramName].max}
              aria-labelledby="label"
              onChange={handleSliderChange('max', paramName)}
            />
          </div>
          <FormGroup class={classes.buttons}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={panels[paramName].x}
                  onChange={handleFormChange('x', paramName)}
                  value="x"
                />
              }
              label="X"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={panels[paramName].y}
                  onChange={handleFormChange('y', paramName)}
                  value="y"
                />
              }
              label="Y"
            />
          </FormGroup>
      </Paper>
    );
  }
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);