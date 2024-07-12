import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const leftArrow = require('../assets/icons/leftArrow.png');

const BasicHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={leftArrow} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.backButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    backButton: {
        width: 32,
        height: 32
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.97,
        textAlign: 'center',
        color: '#000'
    },
})

export default BasicHeader;