import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import BasicHeader from './BasicHeader';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const { width } = Dimensions.get('window');

const CustomCameraRoll = ({ route, navigation }) => {
    console.log('camera roll route', route)
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();

    const imageWidth = width / 4 - 1;

    useEffect(() => {
        FetchImages()
    }, [])

    const FetchImages = async () => {
        CameraRoll.getPhotos({
            first: 100
        }).then(res => {
            console.log({ res })
            setImages(res.edges.map(e => e.node.image))
        })
    }

    const selectImage = (item) => {
        setSelectedImage(item)
        route.params.onSelect(item)
        navigation.goBack('ChatScreen')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => selectImage(item)}
                style={{
                    borderWidth: 0.5, borderColor: '#FFF'
                }}
            >
                <Image source={item} style={{ width: imageWidth, height: imageWidth }} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={"카메라"} />
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={4}
                removeClippedSubviews
            />
        </SafeAreaView>
    )
}

export default CustomCameraRoll;