import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Controls extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>Controls</Paper>
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);