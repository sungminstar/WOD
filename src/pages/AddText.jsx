import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Toast from '../components/Toast';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const leftArrow = require('../assets/icons/leftArrow.png');
const rightArrow = require('../assets/icons/rightArrow.png');
const hashtagIcon = require('../assets/icons/hashtag.png');

const {width} = Dimensions.get('window');

const AddText = ({route}) => {
  const {selectedPhoto} = route.params;
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleCreateFeed = async () => {
    const feedData = new FormData();
    feedData.append('feedRequest', JSON.stringify({content, tags}));

    if (selectedPhoto) {
      feedData.append('image', {
        uri: selectedPhoto.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.post(
        'http://13.209.27.220:8080/feed',
        feedData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        const result = response.data;
        console.log('피드 생성');
        console.log('feedRequest:', {content, tags});
        console.log('image:', selectedPhoto ? [selectedPhoto.uri] : []);

        setToastVisible(true);
        setTimeout(() => {
          navigation.navigate('MainTab', {screen: '홈'});
          setToastVisible(false);
        }, 2000);
      } else {
        console.error('Failed to create feed');
      }
    } catch (error) {
      console.error('Error creating feed:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>새 게시물</Text>
        <TouchableOpacity onPress={handleCreateFeed}>
          <Image source={rightArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {selectedPhoto && (
          <Image
            source={{uri: selectedPhoto.uri}}
            style={styles.selectedPhoto}
          />
        )}
        <TextInput
          placeholder="내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          style={styles.textInput}
        />
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => handleDelete(tag)}>
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tagInputContainer}>
          <Image source={hashtagIcon} style={styles.tagIcon} />
          <TextInput
            placeholder="태그를 입력하세요"
            value={tagInput}
            onChangeText={setTagInput}
            style={styles.tagInput}
            onSubmitEditing={handleAddTag}
          />
        </View>
      </View>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 15,
    color: '#1C1B1F',
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  selectedPhoto: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  textInput: {
    fontSize: 16,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  tagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  tagInput: {
    flex: 1,
    paddingVertical: 12,
  },
});

export default AddText;
