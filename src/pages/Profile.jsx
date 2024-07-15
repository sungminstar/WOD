import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://13.209.27.220:8080/me');
        setProfile(response.data);
      } catch (error) {
        console.error('프로필 정보를 불러오는데 실패했습니다:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>이메일: {profile.email}</Text>
      {/* 추가적인 프로필 정보를 여기에 표시 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default Profile;
