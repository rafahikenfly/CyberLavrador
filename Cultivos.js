
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { getCultivos } from './firebase';
import { EntityList, PropList } from './List';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Cultivos() {

    const [cultivos, setCultivos] = useState(false);
    const Stack = createNativeStackNavigator();

    useEffect(()=>{ getCultivos (setCultivos); }, [])

    if (!cultivos) return <Text>Carregando...</Text>
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="cultivos"
            component={EntityList}
            options={{ title: 'Cultivos' }}
            initialParams={{data: cultivos}}
          />
          {cultivos.map((c,i)=>
            <Stack.Screen
                name={c.key}
                component={PropList}
                options={{ title: c.nome }}
                initialParams={{data: c}}
            />
          )}
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});