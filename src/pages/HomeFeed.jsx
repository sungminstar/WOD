import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import CommentsModal from '../components/CommentsModal';

const logo = require('../assets/icons/logo.png');
const heart = require('../assets/icons/heart.png');
const comment = require('../assets/icons/comment.png');
const more = require('../assets/icons/more.png');

const {width} = Dimensions.get('window');

const dummy_story = [
  {
    id: 1,
    name: 'BONG',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: false,
  },
  {
    id: 2,
    name: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: false,
  },
  {
    id: 3,
    name: 'park_cha',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 4,
    name: 'pig0321',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 5,
    name: 'Pro_yagada',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 6,
    name: 'Pro_yagada',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 7,
    name: 'Pro_yagada',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
  {
    id: 8,
    name: 'Pro_yagada',
    profileImg: 'https://avatar.iran.liara.run/public',
    isOpen: true,
  },
];

const dummy_feed = [
  {
    id: 1,
    name: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: [
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
    ],
    contents: '내 마음...받아줘',
    like: 37,
    likeUsers: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: [
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
    ],
    contents: '내 마음...받아줘',
    like: 37,
    likeUsers: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    feedImg: [
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
      'https://picsum.photos/400/400',
    ],
    contents: '내 마음...받아줘',
    like: 37,
    likeUsers: [1, 2, 3],
  },
];

const HomeFeed = () => {
  const [isVisible, setIsVisible] = useState(false);

  const renderStory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={index === 0 ? {marginHorizontal: 16} : {marginRight: 16}}>
        <Image
          source={{uri: item.profileImg}}
          style={
            item.isOpen
              ? {width: 52, height: 52, marginBottom: 2}
              : {
                  width: 52,
                  height: 52,
                  marginBottom: 2,
                  borderWidth: 2,
                  borderColor: '#2A85FF',
                  borderRadius: 26,
                }
          }
        />
        <Text
          numberOfLines={1}
          style={{
            maxWidth: 52,
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.22,
            color: '#4F4F4F',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeed = ({item, index}) => {
    return (
      <View style={{paddingVertical: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 8,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Image
              source={{uri: item.profileImg}}
              style={{width: 32, height: 32}}
            />
            <Text style={{fontSize: 16, fontWeight: '400', lineHeight: 19.97}}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={more} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: item.feedImg[0]}}
          style={{width, height: width, marginBottom: 8}}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 32,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity>
              <Image source={heart} style={{width: 32, height: 32}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Image source={comment} style={{width: 32, height: 32}} />
            </TouchableOpacity>
          </View>
          <Text>외 37명이 좋아합니다.</Text>
        </View>
        <View style={{marginHorizontal: 16, gap: 4}}>
          <Text>{item.name}</Text>
          <Text style={{fontWeight: '400', color: '#4F4F4F'}}>
            {item.contents}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginBottom: 32,
        }}>
        <FlatList
          data={dummy_feed}
          renderItem={renderFeed}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                borderStyle: 'solid',
                borderBottomWidth: 0.5,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: '#EEE',
              }}>
              <View
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image source={logo} style={{width: 80.5, height: 22}} />
              </View>
            </View>
          )}
        />
        <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </View>
    </SafeAreaView>
  );
};

export default HomeFeed;
