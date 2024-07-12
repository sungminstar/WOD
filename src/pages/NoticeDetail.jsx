import React, { useState} from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import BasicHeader from '../components/BasicHeader';

const dummyImage1 = require('../assets/images/dummyImage1.png');
const heart = require('../assets/icons/heart.png');
const comments = require('../assets/icons/comments.png');

const { width } = Dimensions.get('window');

const NoticeDetail = ({ route }) => {
    const [selectedFilter, setSelectedFilter] = useState('등록순');

    console.log(route)
    const { title, content } = route.params.item



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={title} />
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                    <View style={{ gap: 4, marginVertical: 16 }}>
                        <Text style={{ fontSize: 13, color: '#555' }}>이벤트 당첨자 안내</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAEAEA'}} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                        <Image source={dummyImage1} style={{ width: width - 32, height: width * 0.7 }} />
                    </View>
                    <View>
                        <Text>
                            안녕하세요.
                        </Text>
                    </View>
                    <View style={{ width, height: 7, backgroundColor: '#EAEAEA', marginTop: 16, marginLeft: -16 }} />
                    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F4F4F4', marginBottom: 20}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text>댓글</Text>
                            <Text>4개</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12}}>
                            <TouchableOpacity onPress={() => setSelectedFilter('등록순')}>
                                <Text
                                    style={selectedFilter === '등록순' ? {color: '#383838'} : { color: '#919191'}}
                                >등록순</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedFilter('최신순')}>
                                <Text
                                    style={selectedFilter === '최신순' ? {color: '#383838'} : { color: '#919191'}}
                                >최신순</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4}}>
                            <View style={{ flexDirection:'row', alignItems: 'center', gap: 8}}>
                                <Image source={require('../assets/images/dummyProfile7.png')} style={{width: 32, height: 32}} />
                                <Text>박정아</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require('../assets/icons/replyMore.png')} style={{width: 24, height: 24}} />
                            </TouchableOpacity>
                        </View>
                        <Text>ㅠㅠ 아쉽게도 이번엔 당첨이 안되었네요..</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8, marginBottom: 16}}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2}}>
                                <Image source={heart} style={{ width: 18, height: 18}} />
                                <Text>좋아요 4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',  gap: 2}}>
                                <Image source={comments} style={{ width: 18, height: 18}} />
                                <Text>답글 0</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput 
                            style={{
                                borderWidth: 1,
                                borderColor: '#EAEAEA',
                                borderRadius: 20,
                                paddingVertical: 11,
                                paddingHorizontal: 8
                            }}
                            placeholder='답글을 입력해주세요.'
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default NoticeDetail;