import React from 'react';
import { StyleSheet, View, Button, } from 'react-native';
import Config from './Config';

export default function Menu({action, navigation}) {
  return (
      <View style={styles.fixToText}>
        <Button
          title="Configuração"
          onPress={() => action(<Config />)}
        />
        <Button
          title="Jog"
          onPress={() => navigation.navigate('Jog')}
        />
        <Button
          title="Mapa"
          onPress={() => navigation.navigate('Map')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}); 