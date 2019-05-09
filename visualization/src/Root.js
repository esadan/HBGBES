import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './structure/TopBar'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class Root extends React.Component {
  state = {
    someState: 1,
  };

  render() {
    const { classes } = this.props;


    const internalVariable = (
      <div>Some internal variable</div>
    );

    return (
      <div className={classes.root}>
        <TopBar />
        {internalVariable}
      </div>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);