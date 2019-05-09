import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/lab/Slider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  
});

class ControlPanel extends React.Component {
  state = {
    value: 50,
  };

  aStandardFunction = () => {
    this.setState({ someState: null });
  };

  render() {
    const { value } = this.state;
    const { classes, expanded, handlePanelChange, paramName } = this.props;

    return (
      <ExpansionPanel expanded={expanded === paramName} onChange={handlePanelChange(paramName)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{paramName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Slider
              classes={{ container: classes.slider }}
              value={value}
              aria-labelledby="label"
              onChange={this.handleValueChange}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);