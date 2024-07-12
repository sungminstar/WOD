import { useNavigation } from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

const AnimateExample = ({  }) => {
    const navigation = useNavigation();
    console.log({navigation})
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    moveToRight();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const moveToRight = () => {
    Animated.timing(moveAnim, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: true
    }).start();
  }

  const moveToLeft = () => {
    Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
    }).start();
  }

  const moveToDetail = () => {
    navigation.navigate('Detail', {
        test: '데이터 전송.'
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            transform: [{ translateX: moveAnim}],
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="move to left" onPress={moveToLeft} />
        <Button title="move to right" onPress={moveToRight} />
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
        <Button title="Detail" onPress={moveToDetail} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default AnimateExample;