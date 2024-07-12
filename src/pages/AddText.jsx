// AddText 컴포넌트
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Toast from '../components/Toast'; // Toast 컴포넌트 import
import {useNavigation} from '@react-navigation/native'; // useNavigation 훅 import

const leftArrow = require('../assets/icons/leftArrow.png');
const rightArrow = require('../assets/icons/rightArrow.png');
const hashgtagIcon = require('../assets/icons/hashtag.png');

const AddText = ({route}) => {
  const {selectedPhoto} = route.params;
  const navigation = useNavigation(); // navigation 객체 가져오기
  const [toastVisible, setToastVisible] = useState(false); // 토스트 가시성 상태 관리

  const navigateToHomeFeed = () => {
    setToastVisible(true); // 토스트 메시지 보이기

    // MainTab으로 이동 후 2초 후에 토스트 메시지 숨기기
    setTimeout(() => {
      navigation.navigate('MainTab', {screen: '홈'});
      setToastVisible(false); // 토스트 메시지 숨기기
    }, 2000);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          borderBottomWidth: 0.5,
          borderColor: '#eee',
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: '#1C1B1F', fontWeight: 'bold'}}>
          새 게시물
        </Text>
        <TouchableOpacity onPress={navigateToHomeFeed}>
          <Image source={rightArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>

      <View style={{padding: 24}}>
        {selectedPhoto && (
          <Image
            source={{uri: selectedPhoto.uri}}
            style={{width: 200, height: 200, resizeMode: 'cover'}}
          />
        )}
      </View>
      <View style={{paddingHorizontal: 24}}>
        <Text>여름이다~</Text>
      </View>
      <View
        style={{height: 68, backgroundColor: '#FFF', paddingHorizontal: 16}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchList')}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            marginHorizontal: 16,
            marginVertical: 12,
          }}>
          <TouchableOpacity style={{marginLeft: 16, marginRight: 2}}>
            <Image source={hashgtagIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <TextInput
            placeholder="검색어를 입력하세요."
            style={{flex: 1, paddingHorizontal: 12}}
          />
        </TouchableOpacity>
      </View>

      {/* Toast 컴포넌트 */}
      {toastVisible && (
        <Toast
          message="Uploaded!"
          visible={toastVisible}
          duration={2000}
          handleCancel={() => setToastVisible(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default AddText;
