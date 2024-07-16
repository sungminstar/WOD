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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const logo = require('../assets/icons/logo.png');
const heart = require('../assets/icons/heart.png');
const comment = require('../assets/icons/comment.png');
const more = require('../assets/icons/more.png');

const {width} = Dimensions.get('window');

const HomeFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const navigation = useNavigation();

  const fetchFeeds = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://13.209.27.220:8080/feed', {
        params: {
          page: 0,
          pageSize: 10,
        },
      });
      setFeeds(response.data.result.content);
      console.log(response.data.result.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFeeds();
    }, []),
  );

  const renderFeed = ({item}) => {
    return (
      <View style={{paddingVertical: 24}}>
        <Text>Content: {item.content}</Text>
        <Text>Nickname: {item.nickname}</Text>
        <Text>Profile Image Path: {item.profileImagePath}</Text>
        <Text>Tags: {item.tags.join(', ')}</Text>
        <Text>Images: {item.images.join(', ')}</Text>
        {item.images.map((image, index) => (
          <Image
            key={index}
            source={{uri: `http://13.209.27.220:8080${image}`}}
            style={{width: width, height: width}}
          />
        ))}

        <Text>Emotions:</Text>
        <Text> - Check: {item.emotions.emotionCheck}</Text>
        <Text> - Total: {item.emotions.total}</Text>
        <Text> - Good: {item.emotions.good}</Text>
        <Text> - Funny: {item.emotions.funny}</Text>
        <Text> - Angry: {item.emotions.angry}</Text>
        <Text> - Surprise: {item.emotions.surprise}</Text>
        <Text> - Sad: {item.emotions.sad}</Text>
        {item.replys.map(reply => (
          <View key={reply.replyId} style={{marginTop: 8}}>
            <Text>Reply ID: {reply.replyId}</Text>
            <Text>Nickname: {reply.nickname}</Text>
            <Text>Reply: {reply.reply}</Text>
            <Text>Create Date: {reply.createDate}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={feeds}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFeed}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeFeed;
