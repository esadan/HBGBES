import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class Root extends React.Component {
  state = {
    someState: 1,
  };

  aStandardFunction = () => {
    this.setState({ someState: null });
  };

  render() {
    const { someState } = this.state;
    const { classes, someProps } = this.props;


    const internalVariable = (
      <div>Some internal variable</div>
    );

    return (
      <div className={classes.root}>
        {internalVariable}
      </div>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);