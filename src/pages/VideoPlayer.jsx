import React, {useRef} from 'react';
import { SafeAreaView, View } from 'react-native';
import BasicHeader from '../components/BasicHeader';
import Video, { VideoRef } from 'react-native-video';

const VideoPlayer = () => {
    const videoRef = useRef(null);

    const dummyVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

    const dummyLocalVideo = require('../assets/videos/dummy.mp4');

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#FFF'}}>
            <BasicHeader title={"비디오"} />
            <Video 
                source={dummyLocalVideo}
                ref={videoRef}
                style={{
                    width: 320,
                    height: 320,
                }}
                muted
                repeat={true}
                playInBackground={false}
            />
        </SafeAreaView>
    )
}

export default VideoPlayer;