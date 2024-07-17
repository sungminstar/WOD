import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {getUserInfo, getMyPageInfo} from '../apis/accounts';

const settingsIcon = require('../assets/icons/settings.png');
const {width} = Dimensions.get('window');

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

  const [feeds, setFeeds] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyPageInfo();
        // 최신 피드가 맨 위에 오도록 내림차순 정렬
        data.feedList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setFeeds(data.feedList);
      } catch (error) {
        console.error('Error fetching user feeds:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const renderFeedItem = ({item}) => {
    return (
      <View style={{paddingBottom: 24}}>
        <FlatList
          data={item.images}
          keyExtractor={(imageUri, index) => `image-${item.id}-${index}`}
          renderItem={({item: imageUri}) => (
            <Image
              source={{uri: `http://13.209.27.220:8080${imageUri}`}}
              style={styles.feedImage}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.nickNameText}>{userInfo.nickName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image source={settingsIcon} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: userInfo.profileImagePath || 'https://picsum.photos/130/130',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.introduceText}>
            {userInfo.introduce || '안녕하세요~'}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.stat}>
            <Text style={styles.statText}>{userInfo.feedCount}</Text>
            <Text style={styles.statLabel}>게시물</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Followers')}
            style={styles.stat}>
            <Text style={styles.statText}>{userInfo.followerCount}</Text>
            <Text style={styles.statLabel}>팔로워</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stat}>
            <Text style={styles.statText}>{userInfo.followingCount}</Text>
            <Text style={styles.statLabel}>팔로잉</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={feeds}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: '#EEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nickNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsIcon: {
    width: 32,
    height: 32,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  introduceText: {
    fontSize: 12,
    color: '#777',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  feedImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 10,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Mypage;
