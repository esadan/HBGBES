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

const styles = theme => ({
  slider: {
    padding: '22px 0px',
  },
  root: {
    width: 300,
  },
});

class ControlPanel extends React.Component {
  state = {
    x: true,
    y: true,
    color: true,
    min: 0,
    max: 0,
  };

  handleFormChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSliderChange = name => (event, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { classes, expanded, handlePanelChange, paramName } = this.props;

    return (
      <ExpansionPanel expanded={expanded === paramName} onChange={handlePanelChange(paramName)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{paramName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.root}>
              <Slider
                classes={{ container: classes.slider }}
                value={this.state.min}
                aria-labelledby="label"
                onChange={this.handleSliderChange('min')}
              />
              <Slider
                classes={{ container: classes.slider }}
                value={this.state.max}
                aria-labelledby="label"
                onChange={this.handleSliderChange('max')}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.x}
                      onChange={this.handleFormChange('x')}
                      value="x"
                    />
                  }
                  label="X"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.y}
                      onChange={this.handleFormChange('y')}
                      value="y"
                    />
                  }
                  label="Y"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.color}
                      onChange={this.handleFormChange('color')}
                      value="color"
                    />
                  }
                  label="Color"
                />
              </FormGroup>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);