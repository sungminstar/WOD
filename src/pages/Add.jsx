import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
const leftArrow = require('../assets/icons/leftArrow.png');
const rightArrow = require('../assets/icons/rightArrow.png');

const Add = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    FetchImages();
  }, []);

  const FetchImages = async () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      groupTypes: 'All',
    }).then(res => {
      console.log(res);
      if (!selectedPhoto) {
        setSelectedPhoto(res.edges[0].node.image);
        setSelectedIndex(0);
      }

      setImages(res.edges.map(e => e.node.image));
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{borderWidth: 1, borderColor: '#EEE'}}
        onPress={() => {
          setSelectedPhoto(item);
          setSelectedIndex(index);
        }}>
        {selectedIndex === index && (
          <View
            style={{
              position: 'absolute',
              right: 8,
              top: 2,
              width: 20,
              height: 20,
              zIndex: 2,
            }}>
            <View>
              <Image source={require('../assets/icons/isSelected.png')} />
            </View>
          </View>
        )}
        <Image
          source={item}
          style={{
            width: width / 4 - 2,
            height: width / 4 - 2,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          borderStyle: 'solid',
          borderBottomWidth: 0.5,
          borderColor: '#eee',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: '#1C1B1F', fontWeight: 'bold'}}>
          새 게시물
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddText', {selectedPhoto})}>
          <Image source={rightArrow} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#fff', flex: 0.5, paddingVertical: 24}}>
        <Image
          source={{uri: selectedPhoto?.uri}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{flex: 0.5, backgroundColor: '#fff'}}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Add;
