import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './structure/TopBar'
import Content from './structure/Content'
import Controls from './structure/Controls'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { readLogCurveHeaders } from './scripts/LogDataRepository';

const styles = theme => ({
  root: {
    
  },
});

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headers: readLogCurveHeaders(),
      currentXname: 'T',
      currentYname: 'S',
      panels: {
        'S': {
          min: 0,
          max: 100,
          x: false,
          y: true,
          color: false,
        },
        'T': {
          min: 0,
          max: 100,
          x: true,
          y: false,
          color: false,
        },
        'U': {
          min: 0,
          max: 100,
          x: false,
          y: false,
          color: false,
        },
        'V': {
          min: 0,
          max: 100,
          x: false,
          y: false,
          color: false,
        },
      },
    }
  }

  handleLatentChange = () => event => {
    const { panels } = { ...this.state };
    const currentState = panels;

    if(currentState['U']['y'] !== true && currentState['V']['x'] !== true){
      currentState['U']['y'] = true ;
      currentState[this.state.currentYname]['y'] = false
      this.setState({ currentYname: 'U' });

      currentState['V']['x'] = true ;
      currentState[this.state.currentXname]['x'] = false
      this.setState({ currentXname: 'V' });

      this.setState({ panels: currentState });
    }
  }
  handleRealChange = () => event => {
    const { panels } = { ...this.state };
    const currentState = panels;

    if(currentState['S']['y'] !== true && currentState['T']['x'] !== true){
      currentState['S']['y'] = true ;
      currentState[this.state.currentYname]['y'] = false
      this.setState({ currentYname: 'S' });

      currentState['T']['x'] = true ;
      currentState[this.state.currentXname]['x'] = false
      this.setState({ currentXname: 'T' });

      this.setState({ panels: currentState });
    }
  }

  handleFormChange = (name, paramName) => event => {
    const { panels } = { ...this.state };
    const currentState = panels;
    if(currentState[paramName][name] === false) {
      currentState[paramName][name] = event.target.checked ;
      if(name === 'x'){ 
        currentState[this.state.currentXname][name] = false 
        this.setState({ currentXname: paramName });
      }
      if(name === 'y'){ 
        currentState[this.state.currentYname][name] = false 
        this.setState({ currentYname: paramName });
      }

      this.setState({ panels: currentState });
    }
  };

  handleSliderChange = (name, paramName) => (event, value) => {
    const { panels } = { ...this.state };
    const currentState = panels;
    currentState[paramName][name] = value;

    this.setState({ panels: currentState });
  };

  render() {
    const { classes } = this.props;
    const { panels, headers } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={0}>
          <TopBar />
          <Grid item xs={12} sm={3}>
            <Controls panels={panels} 
                      handleRealChange={this.handleRealChange}
                      handleLatentChange={this.handleLatentChange}
                      handleFormChange={this.handleFormChange} 
                      handleSliderChange={this.handleSliderChange} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Content panels={panels} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);