import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ControlPanel from './ControlPanel'
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Controls extends React.Component {
  state = {
    expanded: null,
  };

  handleValueChange = (event, value) => {
    this.setState({ value });
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, panels, handleFormChange, handleSliderChange } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <ControlPanel panels={panels} 
                        paramName="S" 
                        expanded={expanded} 
                        handlePanelChange={this.handlePanelChange} 
                        handleFormChange={handleFormChange} 
                        handleSliderChange={handleSliderChange} />
          <hr/>
          <ControlPanel panels={panels} 
                        paramName="T" 
                        expanded={expanded} 
                        handlePanelChange={this.handlePanelChange} 
                        handleFormChange={handleFormChange} 
                        handleSliderChange={handleSliderChange} />
          <hr/>
          <ControlPanel panels={panels} 
                        paramName="U" 
                        expanded={expanded} 
                        handlePanelChange={this.handlePanelChange}
                        handleFormChange={handleFormChange} 
                        handleSliderChange={handleSliderChange} />
          <hr/>
          <ControlPanel panels={panels} 
                        paramName="V" 
                        expanded={expanded} 
                        handlePanelChange={this.handlePanelChange} 
                        handleFormChange={handleFormChange} 
                        handleSliderChange={handleSliderChange} />
        </Paper>
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);