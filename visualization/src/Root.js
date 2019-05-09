import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './structure/TopBar'
import Content from './structure/Content'
import Controls from './structure/Controls'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    
  },
});

class Root extends React.Component {
  state = {
    panels: {
      'S': {
        min: 0,
        max: 0,
        x: false,
        y: false,
        color: false,
      },
      'T': {
        min: 0,
        max: 0,
        x: false,
        y: false,
        color: false,
      },
      'U': {
        min: 0,
        max: 0,
        x: false,
        y: false,
        color: false,
      },
      'V': {
        min: 0,
        max: 0,
        x: false,
        y: false,
        color: false,
      },
    },
  }

  handleFormChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSliderChange = (name, paramName) => (event, value) => {
    const { panels } = { ...this.state };
    const currentState = panels;
    currentState[paramName][name] = value;

    this.setState({ panels: currentState });
  };

  render() {
    const { classes } = this.props;
    const { panels } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={0}>
          <TopBar />
          <Grid item xs={12} sm={3}>
            <Controls panels={panels} handleFormChange={this.handleFormChange} handleSliderChange={this.handleSliderChange} />
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