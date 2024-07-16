import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';

const searchIcon = require('../assets/icons/search.png');
const multiPhoto = require('../assets/icons/multiPhoto.png');

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://13.209.27.220:8080/feed/search',
        {
          params: {
            page: 0,
            pageSize: 10,
          },
        },
      );
      setFeeds(response.data);
    } catch (error) {
      console.error('search 목록을 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    if (!item.images || item.images.length === 0) {
      return <Text>피드가 없어요</Text>;
    }

    return (
      <TouchableOpacity
        style={{borderWidth: 1, borderColor: '#FFF', width: width / 3}}>
        {item.isMulti && (
          <Image
            source={multiPhoto}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              width: 24,
              height: 24,
              zIndex: 4,
            }}
          />
        )}
        <Image
          source={{uri: `http://13.209.27.220:8080${item.images}`}}
          style={{width: width / 3 - 2, height: width / 3 - 2}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchList')}
            style={styles.searchWrapper}>
            <TouchableOpacity style={styles.searchIconStyle}>
              <Image source={searchIcon} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.inputStyle}>
              검색어를 입력하세요.
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={feeds}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 68,
    backgroundColor: '#FFF',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
  },
  searchIconStyle: {
    marginLeft: 16,
    marginRight: 2,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#828282',
    paddingRight: 12,
  },
});

export default Search;
