import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const backArrow = require('../assets/icons/back_arrow.png');
const Tab = createMaterialTopTabNavigator();

const FollowerTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View>
        <View style={styles.recentKeywordRow}>
          <TouchableOpacity style={styles.recentKeywordUser}>
            <Image
              source={{uri: 'https://picsum.photos/130/130'}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
            <Text>Lucymartin_3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 4,
              padding: 8,
            }}>
            <Text>팔로우 취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FollowingTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Text>Following</Text>
    </View>
  );
};

const Follower = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>이민구</Text>
        <View style={{width: 40}} />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: '#828282',
          tabBarActiveTintColor: '#333333',
          tabBarIndicatorStyle: {
            backgroundColor: '#4F4F4F',
            width: 100,
            marginLeft: 60,
            height: 1,
          },
        }}>
        <Tab.Screen name="230403 팔로워" component={FollowerTab} />
        <Tab.Screen name="261123 팔로잉" component={FollowingTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recentKeywordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  recentKeywordUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
});

export default Follower;
