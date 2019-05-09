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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={0}>
          <TopBar />
          <Grid item xs={12} sm={3}>
            <Controls />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Content />
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