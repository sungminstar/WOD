import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const more = require('../assets/icons/more.png');
const editIcon = require('../assets/icons/bottomtab/add_circle_off.png');
const deleteIcon = require('../assets/icons/bottomtab/add_circle_off.png');

const CommentItem = ({item, index, onEdit, onDelete}) => {
  const getTimeDifference = createdAt => {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);
    const diffInSeconds = Math.floor((currentDate - commentDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  };

  const timeDifference = getTimeDifference(item.createdAt);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <Image
        source={{uri: item.profileImg}}
        style={{width: 32, height: 32, borderRadius: 16}}
      />
      <View style={{flex: 1, marginLeft: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <Text style={{fontSize: 13}}>{item.name}</Text>
          <Text style={{fontSize: 12, color: '#333', marginLeft: 8}}>
            {timeDifference}
          </Text>
        </View>
        <Text style={{color: '#333', fontSize: 15}}>{item.contents}</Text>
      </View>
      <TouchableOpacity onPress={() => onEdit(item.id)}>
        <Image source={editIcon} style={{width: 24, height: 24}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Image source={deleteIcon} style={{width: 24, height: 24}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('More options:', item.id)}>
        <Image source={more} style={{width: 24, height: 24}} />
      </TouchableOpacity>
    </View>
  );
};

export default CommentItem;
