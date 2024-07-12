import React from 'react';
import {View, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const dummy_data = [
  {
    id: 1,
    name: '이민구',
    content: '점심 먹었니 친구야?',
    created_date: '12:03PM',
    position: 'left',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 2,
    name: '나',
    content: '아니 아직 안먹었어, 너는 먹었니?',
    created_date: '12:03PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 3,
    name: '나',
    content: '안먹었으면 같이 먹을까?? 먹고싶은 메뉴가 있으면 말해보겠니?',
    created_date: '12:03PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 4,
    name: '이민구',
    content:
      '나는 풍자 또 간집에 나온 소라 편의점의 제육볶음이 너무 먹고싶구나ㅎㅎㅎㅎ',
    created_date: '12:03PM',
    position: 'left',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 5,
    name: '나',
    content: '그럼먹으러 가자구~~',
    created_date: '12:03PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 6,
    name: '이민구',
    content: '오 몇시에 만날래?',
    created_date: '12:04PM',
    position: 'left',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 7,
    name: '나',
    content: '아 점심은 안되고 저녁에 먹을까?',
    created_date: '12:07PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 8,
    name: '이민구',
    content: '오 몇시에 만날래?',
    created_date: '12:04PM',
    position: 'left',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 9,
    name: '나',
    content: '아 점심은 안되고 저녁에 먹을까?',
    created_date: '12:07PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 10,
    name: '이민구',
    content: '오 몇시에 만날래?',
    created_date: '12:04PM',
    position: 'left',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
  {
    id: 11,
    name: '나',
    content: '아 점심은 안되고 저녁에 먹을까?',
    created_date: '12:07PM',
    position: 'right',
    profileImgUrl: 'https://dummyimage.com/600x400/000/fff',
    isOpen: true,
  },
];

const {width} = Dimensions.get('window');

const BasicCarousel = () => {
  const renderItem = ({item}) => {
    return (
      <View>
        <Image
          source={{uri: item.profileImgUrl}}
          style={{width: width, height: width}}
        />
        {/* <Text>{item.content}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Carousel</Text>
        <Carousel
          data={dummy_data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
    </SafeAreaView>
  );
};

export default BasicCarousel;
