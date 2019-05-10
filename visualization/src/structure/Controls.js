import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ControlPanel from './ControlPanel'
import Button from '@material-ui/core/Button';


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
  button: {
    margin: theme.spacing.unit,
  },
});

class Controls extends React.Component {

  handleValueChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, panels, handleFormChange, handleSliderChange, handleRealChange, handleLatentChange } = this.props;

    return (
      <div className={classes.root}>
      <Button onClick={handleRealChange()} variant="contained" color="secondary" className={classes.button}>
        Real Space
      </Button>
      <Button onClick={handleLatentChange()} variant="contained" color="secondary" className={classes.button}>
        Latent Space
      </Button>
        <ControlPanel panels={panels} 
                      paramName="S" 
                      handleFormChange={handleFormChange} 
                      handleSliderChange={handleSliderChange} />
        <ControlPanel panels={panels} 
                      paramName="T"  
                      handleFormChange={handleFormChange} 
                      handleSliderChange={handleSliderChange} />
        <ControlPanel panels={panels} 
                      paramName="U" 
                      handleFormChange={handleFormChange} 
                      handleSliderChange={handleSliderChange} />
        <ControlPanel panels={panels} 
                      paramName="V" 
                      handleFormChange={handleFormChange} 
                      handleSliderChange={handleSliderChange} />
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);