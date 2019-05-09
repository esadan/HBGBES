import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ControlPanel from './ControlPanel'


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
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ControlPanel paramName="S" expanded={expanded} handlePanelChange={this.handlePanelChange} />
        <ControlPanel paramName="T" expanded={expanded} handlePanelChange={this.handlePanelChange} />
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Controls);