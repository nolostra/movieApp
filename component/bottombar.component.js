import React , { useState, useEffect }from 'react';
import { View, Text, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Keyboard  } from 'react-native';
import { Svg, Circle, Path, Rect } from 'react-native-svg';

const BottomBar = () => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardVisible(true);
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardVisible(false);
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
    return !isKeyboardVisible ?(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -30}
    >
            <TouchableOpacity style={styles.tab}>
                <Svg style={{
                    flexShrink: 0,
                    height: 16,
                    width: 16,
                    marginBottom: 3
                }} width="16" height="16" viewBox="0 0 16 16" fill="none" >
                    <Circle cx="13" cy="3" r="3" fill="#827D88" />
                    <Circle cx="13" cy="13" r="3" fill="#827D88" />
                    <Circle cx="3" cy="13" r="3" fill="#827D88" />
                    <Circle cx="3" cy="3" r="3" fill="#827D88" />
                </Svg>
                <Text>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Svg
                    height={35}
                    width={20}
                    viewBox="0 -10 16 42"
                    style={{ marginBottom: -7, marginTop: -10 }}
                >
                    <Path d=" M 16.8166 1.16263 C 16.0484 0.415225 15.0311 0 13.9723 0 H 4.00692 C 2.92734 0 1.9308 0.415225 1.16263 1.18339 C 0.394464 1.95156 0 2.9481 0 4.00692 V 13.9723 C 0 15.0519 0.415225 16.0484 1.18339 16.8166 C 1.95156 17.5848 2.9481 18 4.02768 18 H 13.9723 C 15.0519 18 16.0484 17.5848 16.8166 16.8166 C 17.5848 16.0484 18 15.0519 18 13.9723 V 4.00692 C 17.9792 2.9481 17.564 1.9308 16.8166 1.16263 Z M 12.2907 9.50865 L 7.07958 12.519 C 6.99654 12.5813 6.89273 12.6021 6.78893 12.6021 C 6.68512 12.6021 6.58131 12.5813 6.49827 12.519 C 6.31142 12.4152 6.20761 12.2076 6.20761 12 V 5.97924 C 6.20761 5.77163 6.31142 5.56401 6.49827 5.46021 C 6.68512 5.3564 6.91349 5.3564 7.10035 5.46021 L 12.3114 8.47059 C 12.4983 8.57439 12.6021 8.78201 12.6021 8.98962 C 12.6021 9.19723 12.4775 9.40484 12.2907 9.50865 Z "
                        fill="#FFFFFF" />
                </Svg>
                <Text style={{ color: "#FFFFFF" }}>Watch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Svg style={{
                    flexShrink: 0,
                    height: 18,
                    width: 18,
                    marginBottom:2
                }} width="18" height="18" viewBox="0 0 16 18" fill="none" >
                    <Rect y="3.47369" width="18" height="14.5263" rx="0.947368" fill="#827D88" />
                    <Path d="M16.1053 1.57895C16.6105 1.57895 16.7368 2.10526 16.7368 2.36842H0.947357C0.947357 1.73684 1.36841 1.57895 1.57894 1.57895H16.1053Z" fill="#827D88" />
                    <Path d="M15.2463 0C15.6808 0 15.7895 0.421053 15.7895 0.631579H2.21051C2.21051 0.126316 2.57262 0 2.75367 0H15.2463Z" fill="#827D88" />
                </Svg>
                <Text>MediaLibrary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Svg style={{marginBottom:1}} width="19" height="17" viewBox="0 0 17 14" fill="none" >
                    <Path d="M0.465781 7.13284C0.465761 7.68514 0.913482 8.13288 1.46578 8.13288H2.52828C3.08055 8.13288 3.52826 7.68518 3.52828 7.13292L3.52829 6.96305C3.52831 6.41075 3.08058 5.96301 2.52829 5.96301H1.46579C0.913516 5.96301 0.465808 6.41071 0.465787 6.96298L0.465781 7.13284ZM0.465824 12.1301C0.465824 12.6824 0.913539 13.1301 1.46582 13.1301H2.52832C3.08061 13.1301 3.52832 12.6824 3.52832 12.1301V11.8507C3.52832 11.2984 3.08061 10.8507 2.52832 10.8507H1.46582C0.913539 10.8507 0.465824 11.2984 0.465824 11.8507V12.1301ZM0.465824 2.06987C0.465824 2.62215 0.91354 3.06987 1.46582 3.06987H2.52832C3.08061 3.06987 3.52832 2.62215 3.52832 2.06987V1.98767C3.52832 1.43539 3.08061 0.987671 2.52832 0.987671H1.46582C0.913539 0.987671 0.465824 1.43539 0.465824 1.98767V2.06987ZM5.05855 7.13284C5.05853 7.68514 5.50626 8.13288 6.05855 8.13288H17.0586C17.6108 8.13288 18.0585 7.68518 18.0586 7.13291L18.0586 6.96305C18.0586 6.41075 17.6109 5.96301 17.0586 5.96301H6.05856C5.50629 5.96301 5.05858 6.41071 5.05856 6.96298L5.05855 7.13284ZM5.0586 12.1301C5.0586 12.6824 5.50631 13.1301 6.0586 13.1301H17.0586C17.6109 13.1301 18.0586 12.6824 18.0586 12.1301L18.0586 11.8507C18.0586 11.2984 17.6109 10.8507 17.0586 10.8507H6.0586C5.50631 10.8507 5.0586 11.2984 5.0586 11.8507V12.1301ZM6.0586 0.987671C5.50631 0.987671 5.0586 1.43539 5.0586 1.98767L5.0586 2.06987C5.0586 2.62215 5.50631 3.06987 6.0586 3.06987H17.0586C17.6109 3.06987 18.0586 2.62216 18.0586 2.06987L18.0586 1.98767C18.0586 1.43539 17.6109 0.987671 17.0586 0.987671H6.0586Z" fill="#827D88" />
                </Svg>
                <Text>More</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    ): null
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(46, 39, 57, 1)',
        height: 60,
        width: '100%',
        borderRadius: 40 // Stretch the bar to the full width of the screen
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomBar;
