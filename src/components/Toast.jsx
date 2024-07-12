// Toast 컴포넌트
import React, {useRef, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const Toast = ({message, visible, duration, handleCancel}) => {
  const toastValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      toastAnimation();
    }
  }, [toastAnimation, visible]);

  const toastAnimation = useCallback(() => {
    toastValue.setValue(0);
    Animated.spring(toastValue, {
      toValue: 1,
      delay: 100,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        Animated.timing(toastValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          delay: duration || 1000,
        }).start(() => {
          handleCancel();
        });
      }
    });
  }, [duration, handleCancel]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity: toastValue,
          transform: [
            {
              translateY: toastValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}>
      <View style={styles.toastContents}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // 다른 요소 위에 오도록 설정
  },
  toastContents: {
    justifyContent: 'center',
    height: 39,
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1F',
  },
});

export default Toast;
