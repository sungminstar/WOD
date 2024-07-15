import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import logo from '../assets/icons/splashLogo.png';

const Splash = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Image source={logo} style></Image>
    </View>
  );
};

export default Splash;
