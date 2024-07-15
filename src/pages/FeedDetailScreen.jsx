import React from 'react';
import {View, Text, Image} from 'react-native';

const FeedDetailScreen = ({route}) => {
  const {feed} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', padding: 16}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
        피드 상세 정보
      </Text>
      {feed.images && feed.images.length > 0 && (
        <Image
          source={{uri: feed.images[0]}}
          style={{width: '100%', height: 300, marginBottom: 8}}
        />
      )}
      <Text style={{marginBottom: 8}}>{feed.nickname}</Text>
      <Text style={{marginBottom: 16}}>{feed.content}</Text>
      {/* 피드의 기타 상세 정보를 필요에 따라 렌더링합니다 */}
    </View>
  );
};

export default FeedDetailScreen;
