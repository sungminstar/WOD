import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AlertModal = ({ isVisible, okText, noText, headerTitle, onPressOk, onPressNo }) => {
    return (
        <Modal
            useNativeDriver
            animationIn="zoomIn"
            animationOut="fadeOut"
            animationInTiming={200}
            animationOutTiming={200}
            isVisible={isVisible}
            backdropOpacity={0.6}
            style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={{
                width: 320,
                borderRadius: 8,
                backgroundColor: '#FFF',
                paddingTop: 10
            }}>
                <View style={{
                    minHeight: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <Text>
                        {headerTitle}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', borderStyle: 'solid', borderColor: '#c3c3c3', borderTopWidth: 0.5 }}>
                    <TouchableOpacity
                        onPress={onPressNo}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50
                        }}>
                        <Text>{noText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressOk}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50
                        }}>
                        <Text>{okText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AlertModal;