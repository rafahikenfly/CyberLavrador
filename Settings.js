import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Settings() {
    const [dirty, setDirty] = useState(false);
    const [terreno, setTerreno] = useState("-MNnlN1q-yIjTKEgGeP5");
    const [equipamento, setEquipamento] = useState("-MOWVcaMjn0VK6qqKiu2");

    const salvar = () => {
        console.log("salvei");
        setDirty(false);
    }
    return (
        <View>
            <View style={styles.inputContainer}>
                <Ionicons
                    size={25}
                    name="planet-outline"
                    />
                <TextInput 
                    style={styles.input}
                    defaultValue={terreno}
                    onChange = {(e)=>{setTerreno(e.target.value); setDirty(true)}}
                    />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons
                    size={25}
                    name="code-working-outline"
                    />
                <TextInput 
                    style={styles.input}
                    defaultValue={equipamento}
                    onChange = {(e)=>{setEquipamento(e.target.value); setDirty(true)}}
                    />
                </View>
                {dirty && <Ionicons size={25} name="save-outline" onPress={salvar} />}
            </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 6,
        marginVertical: 4,
        marginHorizontal: 4,
        flex:1,
        flexDirection:"row",
      },
      label: {
        fontSize: 12,
        width: 80,
      },
      input: {
        fontSize: 12,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
      },
    
})