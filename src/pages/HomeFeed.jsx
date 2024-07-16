import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import CommentsModal from '../components/CommentsModal';
import {useNavigation} from '@react-navigation/native';

const logo = require('../assets/icons/logo.png');
const heart = require('../assets/icons/heart.png');
const comment = require('../assets/icons/comment.png');
const more = require('../assets/icons/more.png');

const {width} = Dimensions.get('window');

const fetchFeedDetails = async feedId => {
  try {
    const response = await axios.get(
      `http://13.209.27.220:8080/feed/${feedId}`,
    );
    if (response.status === 200 && response.data.success) {
      return response.data.result;
    } else {
      throw new Error('피드 상세 정보를 불러오지 못했습니다');
    }
  } catch (error) {
    console.error('피드 상세 정보를 불러오는 중 오류 발생:', error);
    throw error;
  }
};

const fetchFeeds = async (setFeeds, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get('http://13.209.27.220:8080/feed', {
      params: {
        page: 0,
        pageSize: 10,
      },
    });

    if (response.status === 200 && response.data.success) {
      const feedItems = response.data.result.content;

      feedItems.forEach(feed => {
        console.log('Uploaded feed:', feed);
      });

      setFeeds(feedItems);
    } else {
      console.error('피드 목록을 불러오지 못했습니다:', response.data.message);
    }
  } catch (error) {
    console.error('피드 목록을 불러오는 중 오류 발생:', error);
  } finally {
    setLoading(false);
  }
};

const HomeFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchFeeds(setFeeds, setLoading);
    }, []),
  );

  const renderFeed = ({item}) => {
    const handleShowModal = async feedId => {
      try {
        const detailedFeed = await fetchFeedDetails(feedId);
        navigation.navigate('FeedDetailScreen', {feed: detailedFeed});
      } catch (error) {
        console.error('피드 상세 정보를 불러오는 중 오류 발생:', error);
        // 피드 상세 정보 불러오기 오류 처리
      }
    };

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
              style={{width: 32, height: 32, borderRadius: 16}}
            />
            <Text style={{fontSize: 16, fontWeight: '400', lineHeight: 19.97}}>
              {item.nickname}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowModal(item.id)}>
            <Image source={more} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.images}
          keyExtractor={(image, index) => `image-${item.id}-${index}`}
          renderItem={({item: imageUri}) => (
            <Image
              source={{uri: `http://13.209.27.220:8080${imageUri}`}}
              style={{width: width, height: width}}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 32,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
            }}>
            <TouchableOpacity>
              <Image source={heart} style={{width: 32, height: 32}} />
            </TouchableOpacity>
            <Text>{item.emotions.total}</Text>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image source={comment} style={{width: 32, height: 32}} />
            </TouchableOpacity>
            <Text>{item.replys.length}</Text>
          </View>
        </View>
        <View style={{marginHorizontal: 16, marginBottom: 16}}>
          <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 4}}>
            {item.nickname}
          </Text>
          <Text style={{fontWeight: '400', color: '#4F4F4F'}}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  // 로딩중 화면
  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingSpinner}>
          <ActivityIndicator size="large" color="#FFE082" />
        </View>
      </SafeAreaView>
    );
  }

  // 로딩 false 홈 피드
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={feeds}
          renderItem={renderFeed}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  logo: {
    width: 100,
    height: 32,
    margin: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeFeed;
