import React from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatList = ({navigation}) => {
  const chatData = [
    {
      id: 1,
      name: '임성민',
      message: '아 점심은 안되고 저녁에 먹을까?',
      profileUrl: require('../assets/images/dummyProfile.png'),
    },
    {
      id: 2,
      name: '임성민',
      message: '오늘 날씨 좋다~',
      profileUrl: {uri: 'https://picsum.photos/130/130'},
    },
    {
      id: 3,
      name: '임성민',
      message: '오늘 날씨 좋다~',
      profileUrl: {uri: 'https://picsum.photos/130/130'},
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', {name: item.name})}>
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
        }}>
        <Image
          source={item.profileUrl}
          style={{width: 60, height: 60, borderRadius: 30, marginBottom: 4}}
        />

        <View
          style={{
            marginLeft: 16,
            width: 240,
            height: 40,
          }}>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start'}}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#2b2b2b',
              marginTop: 8,
              alignSelf: 'flex-start',
            }}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 24,
            bborderStyle: 'solid',
            borderBottomWidth: 0.5,

            borderColor: '#EEE',
          }}>
          <View style={{margin: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>임성민</Text>
            <Text style={{fontSize: 12, color: '#2b2b2b', marginTop: 16}}>
              오늘 날씨 좋다~
            </Text>
          </View>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/130/130'}}
              style={{width: 60, height: 60, borderRadius: 30, marginBottom: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 20, padding: 10, marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: '400'}}> Message </Text>
        </View>
      </View>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ChatList;
