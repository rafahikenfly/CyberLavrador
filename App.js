import React, { useState } from 'react';
import Jog from './Jog';
import Config from './Config';
import Cultivos from './Cultivos';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Settings from './Settings';

export default function App() {

  const Tab = createBottomTabNavigator();
  const MoverStack = createNativeStackNavigator();
  function MoverStackScreen() {
    return (
      <MoverStack.Navigator
        screenOptions={() => ({
          headerShown: true,
        })}  
      >
        <MoverStack.Screen name="Mover" component={Jog} />
      </MoverStack.Navigator>
    );
  }

  const CultivosStack = createNativeStackNavigator();
  function CultivosStackScreen() {
    return (
      <CultivosStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}  
      >
        <CultivosStack.Screen name="Lista" component={Cultivos} />
        <CultivosStack.Screen name="Mapa" component={Cultivos} />
      </CultivosStack.Navigator>
    );
  }
  const RoboStack = createNativeStackNavigator();
  function RoboStackScreen() {
    return (
      <RoboStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}  
      >
      <RoboStack.Screen name="RoboConfig" component={Config} />
      </RoboStack.Navigator>
    );
  }
  const ConfigStack = createNativeStackNavigator();
  function ConfigStackScreen() {
    return (
      <ConfigStack.Navigator
        screenOptions={() => ({
          headerShown: true,
        })}  
      >
      <ConfigStack.Screen name="Configurações" component={Settings} />
      </ConfigStack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Mover":
              iconName = focused
                ? 'move'
                : 'move';                    
              break;
            case "Cultivos":
              iconName = focused
                ? 'leaf'
                : 'leaf';                    
              break;
            case "Robô":
              iconName = focused
              ? 'code-working'
              : 'code-working';  
              break;
            case "Configurar":
              iconName = focused
              ? 'cog'
              : 'cog';  
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      >
        <Tab.Screen name="Mover" component={MoverStackScreen} />
        <Tab.Screen name="Cultivos" component={CultivosStackScreen} /> 
        <Tab.Screen name="Robô" component={RoboStackScreen} /> 
        <Tab.Screen name="Configurar" component={ConfigStackScreen} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}