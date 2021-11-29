import React from 'react';
import { Text, View } from 'react-native';

export default function Header ({title}) {
    return (
        <View>
            <Text>MicroAgricultura</Text>
            <Text>{title}</Text>
        </View>
      )
}