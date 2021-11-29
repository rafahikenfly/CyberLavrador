import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { enviaInstrucao } from './firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Jog() {

    const jogSizeArr = [10,100,1000];

    const [jogSize, setjogSize] = useState(0);
    const [position, setPosition] = useState({X:0, Y:0, Z:0});
    const [limit, setLimit] = useState({X:1000, Y:1000, Z:1000});
  
    const jog = ({X=0, Y=0, Z=0}) => {
        enviaInstrucao(`G91 G0 X${X} Y${Y} Z${Z}`);
        setPosition({X:position.X+X, Y:position.Y+Y, Z:position.Z+Z});
    }
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="location-outline"
                />
            </View>
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="swap-horizontal-outline"
                />
                <Text>{position.X}</Text>
            </View>
            <View style={styles.buttonContainer} >
                <Ionicons 
                    size={25}
                    name="swap-vertical-outline"
                />
                <Text>{position.Y}</Text>
            </View>
            <View style={styles.buttonContainer} >
                <Ionicons 
                    size={25}
                    name="layers-outline"
                />
                <Text>{position.Z}</Text>
            </View>


            <View style={styles.empty} />
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="arrow-up"
                    onPress={()=>jog({X:jogSizeArr[jogSize]})} 
                />
                {/*disabled={position.X === limit.X} */}
            </View>
            <View style={styles.empty} />
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="caret-up-outline"
                    onPress={()=>jog({Z:jogSizeArr[jogSize]})} 
                />
                {/*disabled={position.Z === limit.Z} */}
            </View>


            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="arrow-back"
                    onPress={()=>jog({Y:-jogSizeArr[jogSize]})} 
                />
            </View>
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="home-outline"
                    onPress={()=>jog({X:0, Y:0, Z:0})} />
            </View>
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="arrow-forward"
                    onPress={()=>jog({Y:jogSizeArr[jogSize]})} 
                />
                {/*disabled={position.Y === limit.Y}*/}
            </View>
            <View style={styles.empty} />


            <View style={styles.empty} />
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="arrow-down"
                    onPress={()=>jog({X:-jogSizeArr[jogSize]})} 
                />
                {/*disabled={position.X === 0} */}
            </View>
            <View style={styles.empty} />
            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="caret-down-outline"
                    onPress={()=>jog({Z:-jogSizeArr[jogSize]})} 
                />
                {/*disabled={position.Z === 0}*/}
            </View>


            <View style={styles.buttonContainer} >
                <Ionicons
                    size={25}
                    name="resize-outline"
                />
            </View>
            {jogSizeArr.map((size,i)=>{
                return (
                    <View key={"jog-"+i} style={jogSize === i ? [styles.buttonContainer, styles.selected] : styles.buttonContainer} >
                        <Button onPress={()=>setjogSize(i)} title={size+" mm"} />
                    </View>
                )
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      width: 360,
      alignContent: "flex-start",
    },
    buttonContainer: {
      width: 90,
      height: 90,
      padding: 15,
      alignContent: 'center',
      alignItems: 'center',
    },
    empty: {
      width: 80,
      height: 80,
    },
    selected: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#0000FF",
    },
    });
    