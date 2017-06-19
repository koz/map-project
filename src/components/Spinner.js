import React from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types'

export default class Spinner extends React.Component {
  state = {
    spinValue: new Animated.Value(0),
  }

  componentDidMount() {
    this.spinForever();
  }

  spinForever = () => {
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 100,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(event => {
      if (event.finished)
        this.setState({spinValue: new Animated.Value(0)})
        this.spinForever();
    })
}

  render() {
    const { spinValue } = this.state;
    const spin = spinValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })

    return (
      <Animated.Image
        style={[{
          transform: [{rotate: spin}]
        }, this.props.style]}
        source={this.props.source} />
    );
  }
}

Spinner.propTypes = {
  style: PropTypes.number.isRequired,
  source: PropTypes.number.isRequired,
}
