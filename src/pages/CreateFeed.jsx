import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import Toast from '../components/Toast'; // Assuming you have a Toast component

const CreateFeed = ({navigation, setVisible}) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [feedId, setFeedId] = useState(null); // State to store the created feed ID

  const fetchFeeds = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.209.27.220:8080/feed');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeeds(data.result.content);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFeeds();
    });
    return unsubscribe;
  }, [navigation]);

  const handleChoosePhoto = async () => {
    try {
      const res = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
        groupTypes: 'All',
      });
      console.log(res);
      setImages(res.edges.map(e => e.node.image.uri));
    } catch (error) {
      console.error('Error selecting photos:', error);
    }
  };

  const handleImageSelect = image => {
    setImages([image]);
  };

  const handleCreateFeed = async () => {
    if (!content) {
      setError('내용을 입력하세요.');
      return;
    }

    if (images.length === 0) {
      setError('이미지를 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'feedRequest',
      JSON.stringify({
        content,
        tags: tags.split(',').map(tag => tag.trim()),
      }),
    );

    images.forEach((image, index) => {
      formData.append('image', {
        uri: image,
        name: `photo_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    try {
      const response = await axios.post(
        'http://13.209.27.220:8080/feed',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Create feed response:', response.data); // Log the response data

      if (response.status === 200 && response.data.success) {
        setFeedId(response.data.feedId); // 생성된 피드 ID 저장
        setToastVisible(true); // 토스트 메시지 보이기

        // 피드 생성 후 데이터를 다시 가져오고 홈 화면으로 이동
        fetchFeeds();
        navigation.navigate('MainTab', {screen: '홈'});
        setVisible(false); // Close the CreateFeed component
      } else {
        setError(response.data.message || '피드 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating feed:', error);
      setError('피드 생성 중 오류가 발생했습니다.');
    }
  };

  const renderImageItem = ({item, index}) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)} key={index}>
      <Image source={{uri: item}} style={styles.imagePreview} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>내용:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Text>태그 (쉼표로 구분):</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} />
      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={styles.choosePhotoButton}>
        <Text>이미지 선택</Text>
      </TouchableOpacity>
      <FlatList
        horizontal
        data={images}
        keyExtractor={(item, index) => `image-${index}`}
        renderItem={renderImageItem}
        style={styles.imagePreviewContainer}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="피드 생성" onPress={handleCreateFeed} />
      </View>
      {toastVisible && (
        <Toast
          message="Uploaded!"
          visible={toastVisible}
          duration={2000}
          handleCancel={() => setToastVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  choosePhotoButton: {
    backgroundColor: '#DDD',
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePreviewContainer: {
    maxHeight: 120,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateFeed;
