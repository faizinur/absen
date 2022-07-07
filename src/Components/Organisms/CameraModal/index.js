import { View, Modal, Text, Button } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo, useRef } from 'react';
import { log } from '@Utils';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
export default memo(forwardRef(({ location, onResult }, ref) => {
    const refCamera = useRef(<RNCamera />);
    const [modalVisible, setModalVisible] = useState(false);
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _takePicture = async camera => {
        try {
            const { uri, base64 } = await camera.takePictureAsync({ quality: 1, base64: true });
            RNFS.unlink(uri);
            onResult({ base64 }, location)
            toggle()
        } catch (err) {
            log(err)
            global?.showToast(`camera error : ${err}`, 10000, 'danger')
        }
    };
    return (
        <Modal
            statusBarTranslucent
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggle}>
            <View style={{ flex: 1 }}>
                {modalVisible && <RNCamera
                    ref={refCamera}
                    style={{ flex: 1 }}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <Text>Please Wait</Text>;
                        return (
                            <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, left: 0 }}>
                                <Button title='foto' onPress={() => _takePicture(camera)} />
                            </View>
                        )
                    }}
                </RNCamera>}
            </View>
        </Modal>
    )
}))