import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function Card({userId, orderId, type, weight}) {
    return (
        <View style={styles.card} >
            <View style={styles.detailsContainer}>
                <Text>User Id:{userId}</Text>
                <Text>Order Id:{orderId}</Text>
                <Text>Type: {type}</Text>
                <Text>Weight: {weight}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 20,
        overflow: "hidden",
    },
    detailsContainer:{
        marginTop: 5,
        padding: 10,
    },
    image: {
        width: "100%",
        height: 200,
    }
})

export default Card;
