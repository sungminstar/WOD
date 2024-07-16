import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

const settingsIcon = require('../assets/icons/settings.png');
import {getUserInfo} from '../apis/accounts';

const Mypage = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    email: '',
    introduce: '',
    profileImagePath: '',
    followingCount: '',
    followerCount: '',
    feedCount: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);

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
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {userInfo.nickName}
          </Text>
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
              source={{
                uri:
                  userInfo.profileImagePath || 'https://picsum.photos/130/130',
              }}
              style={{width: 60, height: 60, borderRadius: 30, marginBottom: 4}}
            />
            <Text style={{fontSize: 12, marginLeft: 4}}>
              {userInfo.nickName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
            <TouchableOpacity style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>{userInfo.feedCount}</Text>
              <Text style={{fontSize: 13}}>게시물</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Follower')}
              style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>{userInfo.followerCount}</Text>
              <Text style={{fontSize: 13}}>팔로워</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', gap: 2}}>
              <Text style={{fontSize: 12}}>{userInfo.followingCount}</Text>
              <Text style={{fontSize: 13}}>팔로윙</Text>
            </TouchableOpacity>
          </View>
        </View>
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

export default Mypage;
