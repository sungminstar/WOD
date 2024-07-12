import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

const settingsIcon = require('../assets/icons/settings.png');

const Mypage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 16,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>xjdalsdl</Text>
          <TouchableOpacity>
            <Image source={settingsIcon} style={{width: 32, height: 32}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/130/130'}}
              style={{width: 60, height: 60, borderRadius: 30, marginBottom: 4}}
            />
            <Text style={{fontSize: 12, marginLeft: 4}}>임성민</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
            <TouchableOpacity style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>100</Text>
              <Text style={{fontSize: 13}}>게시물</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Follower')}
              style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>1204</Text>
              <Text style={{fontSize: 13}}>팔로워</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>542</Text>
              <Text style={{fontSize: 13}}>팔로윙</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mypage;
