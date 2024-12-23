import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const RippleDots = () => {
    const dot1 = useRef(new Animated.Value(1)).current; // Dấu chấm 1
    const dot2 = useRef(new Animated.Value(1)).current; // Dấu chấm 2
    const dot3 = useRef(new Animated.Value(1)).current; // Dấu chấm 3

    useEffect(() => {
        const animateDot = (dot, delay) => {
            setTimeout(() => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot, {
                            toValue: 2,
                            duration: 800,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dot, {
                            toValue: 1,
                            duration: 800,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();
            }, delay);
        };

        animateDot(dot1, 0);     // Không trễ
        animateDot(dot2, 500);   // Trễ 500ms
        animateDot(dot3, 1000);  // Trễ 1000ms
    }, [dot1, dot2, dot3]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.dot,
                    { transform: [{ scale: dot1 }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    { transform: [{ scale: dot2 }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    { transform: [{ scale: dot3 }] },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
        marginHorizontal: 5,
    },
});

export default RippleDots;
