import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

import InfiniteCarousel from './InfiniteCarousel';
const animals = [
  {
    name: 'Leon',
    color: '#2969B0',
  },
  {
    name: 'Cat',
    color: '#FBA026',
  },
  {
    name: 'Elephant',
    color: '#E14938',
  },
  {
    name: 'Unicorn',
    color: '#9365B8',
  },
];

const HEIGHT = 300;

const Animal = ({ name, color, animatedScale, index, style }) => (
  <View style={[{ backgroundColor: color }, styles.animal]}>
    <TouchableOpacity onPress={() => console.log(`Selected index is ${index}`)}>
      <Animated.View
        style={[
          {
            transform: [{ scale: animatedScale }],
          },
          style,
          styles.animalAnimatedBox,
        ]}>
        <Text style={{ color, fontWeight: 'bold' }}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  </View>
);

class Example extends Component {
  state = {
    dimensions: {},
  };

  _isSameMeasure = (measurement1, measurement2) =>
    measurement1.width === measurement2.width &&
    measurement1.height === measurement2.height;

  _onLayout = ({ nativeEvent }) => {
    const dimensions = nativeEvent.layout;
    if (!this._isSameMeasure(this.state.dimensions, dimensions)) {
      this.setState({ dimensions });
    }
  };

  render() {
    const dynamicContainerStyle = {
      height: HEIGHT,
      width: this.state.dimensions.width,
    };

    const RECTANGLE_RATIO = 0.8;
    const MIN_SCALE = 0.7;
    const MAX_SCALE = 1;
    // we will pass an array of functions as children
    const pages = animals.map((animal, index) =>
      (animatedPosition, pageWidth, pageOffset) => {
        const height = pageWidth * 0.8;
        const width = height * RECTANGLE_RATIO;
        return (
          <Animal
            {...animal}
            index={index}
            style={{ width, height }}
            animatedScale={animatedPosition.interpolate({
              inputRange: [
                pageOffset - pageWidth,
                pageOffset,
                pageOffset + pageWidth,
              ],
              outputRange: [MIN_SCALE, MAX_SCALE, MIN_SCALE],
            })}
          />
        );
      });

    return (
      <View style={styles.container} onLayout={this._onLayout}>
        <View style={dynamicContainerStyle}>
          <InfiniteCarousel>
            {pages}
          </InfiniteCarousel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalWrapper: {
    flexDirection: 'row',
  },
  animal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalAnimatedBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default Example;
