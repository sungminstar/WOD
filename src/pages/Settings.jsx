import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import BasicHeader from '../components/BasicHeader';

const myProfile = require('../assets/images/myProfile.png');
const profileModifyArrow = require('../assets/icons/profileModifyArrow.png');
const myPageMenuArrow = require('../assets/icons/myPageMenuArrow.png');

const menuData = [
    {
        id: 1,
        title: '알림받기',
        page: '',
        icon: require('../assets/icons/myPageAlert.png')
    },
    {
        id: 2,
        title: '친구',
        page: 'Home',
        icon: require('../assets/icons/myPageFriend.png')
    },
    {
        id: 3,
        title: '공지사항',
        page: 'Notice',
        icon: require('../assets/icons/myPageNotice.png')
    },
    {
        id: 4,
        title: '채팅/보안',
        page: '',
        icon: require('../assets/icons/myPageSecurity.png')
    },
    {
        id: 20,
        title: '더보기',
        page: '',
        icon: require('../assets/icons/myPageMore.png')
    }
]

const Settings = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'설정'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', paddingBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Image source={myProfile} style={{ width: 56, height: 56 }} />
                    <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 18 }}>김이동</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontWeight: '400', color: '#4F4F4F', fontSize: 14 }}>프로필 수정</Text>
                    <Image source={profileModifyArrow} style={{ width: 5, height: 10 }} resizeMode='cover' />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 16 }}>
                <View style={{ gap: 12 }}>
                    <View style={{ gap: 2 }}>
                        <Text style={{ fontWeight: '400', fontSize: 15, color: '#828282' }}>계정ID</Text>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: '#333' }}>iedong@naver.com</Text>
                    </View>
                    <View style={{ gap: 2 }}>
                        <Text style={{ fontWeight: '400', fontSize: 15, color: '#828282' }}>계정 연락처</Text>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: '#333' }}>010-1305-3432</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontWeight: '400', color: '#4F4F4F', fontSize: 14 }}>계정 설정</Text>
                    <Image source={profileModifyArrow} style={{ width: 5, height: 10 }} resizeMode='cover' />
                </TouchableOpacity>
            </View>
            <View>
                {
                    menuData.map((e, i) => (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate(e.page)}
                            style={[styles.menuContainer, menuData.length - 1 === i && { borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}]}>
                            <View style={{flexDirection: 'row', alignItems:'center', gap: 4}}>
                                <Image source={e.icon} style={{ width: 20, height: 20 }} />
                                <Text style={{fontSize: 16, color: '#4F4F4F'}}>{e.title}</Text>
                            </View>
                            <View>
                                {
                                    e.id === 1 ?
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#5FBCFF' }}
                                            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                        : <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            <Image source={myPageMenuArrow} style={{ width: 20, height: 20 }} resizeMode='cover' />
                                        </TouchableOpacity>
                                }
                            </View>

                        </TouchableOpacity>
                    ))
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        paddingHorizontal: 16, 
        paddingVertical: 18,
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2'
    }
})

export default Settings;