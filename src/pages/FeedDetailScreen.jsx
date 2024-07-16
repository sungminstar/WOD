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
import {useNavigation} from '@react-navigation/native';

const leftArrow = require('../assets/icons/leftArrow.png');
const rightArrow = require('../assets/icons/rightArrow.png');
const hashtagIcon = require('../assets/icons/hashtag.png');

const {width} = Dimensions.get('window');

const FeedDetailScreen = ({route, navigation}) => {
  const {feed} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderStyle: 'solid',
          borderBottomWidth: 0.5,
          borderColor: '#eee',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: '#1C1B1F', fontWeight: 'bold'}}>
          {feed.nickname}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={rightArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {feed.images && feed.images.length > 0 && (
          <Image
            source={{uri: `http://13.209.27.220:8080${feed.images}`}}
            style={{width: width, height: width}}
          />
        )}
        <View style={{margin: 16}}>
          <View style={{margin: 16}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Image
                source={{uri: feed.profileImg}}
                style={{width: 32, height: 32, borderRadius: 16}}
              />
              <Text style={{marginBottom: 8}}>{feed.nickname}</Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 16}}>
            <Text style={{margin: 16}}>{feed.content}</Text>
          </View>
          <View style={styles.tagsContainer}>
            <View style={styles.tagsContainer}>
              {feed.tags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    margin: 16,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 4,
    padding: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  tagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default FeedDetailScreen;
