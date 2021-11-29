import React, { useEffect, useState } from "react";
import { StyleSheet, Text, StatusBar, } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropList } from "./List";

import { primeiraMaiuscula } from "./Utils";
import { listenStatus } from "./firebase";


const Stack = createNativeStackNavigator();

export default function Config () {

  const [status, setStatus] = useState(false);

  useEffect(()=>{ listenStatus (setStatus); }, [])
  
  if (!status) return <Text>Carregando...</Text>
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="root"
          component={PropList}
          options={{ title: 'Cyber Lavrador' }}
          initialParams={{data: status}}
        />
        { //Primeira ordem
        Object.keys(status).map((item)=>{
          if (typeof status[item] === 'object') {
            return (
              <Stack.Screen key={item} name={item}
                component={PropList}
                options={{ title: primeiraMaiuscula(item) }}
                initialParams={{data: status[item]}}
              />
            )
          }
        })}
          { //Segunda ordem FIXME:
            Object.keys(status).map((t1)=>{
              if (typeof status[t1] === 'object') return (
                <Stack.Group>
                  {Object.keys(status[t1]).map((t2)=>{
                    if (typeof status[t1][t2] === 'object'){
                      return (
                        <Stack.Screen key={t1+"/"+t2}
                          name={t1+"/"+t2}
                          component={PropList}
                          options={{ title: primeiraMaiuscula(t2) }}
                          initialParams={{data: status[t1][t2]}}
                        />
                      )
                    }
                  })}
                </Stack.Group>
              )
            })
          }
      </Stack.Navigator>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});