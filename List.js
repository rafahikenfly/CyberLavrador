import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, FlatList, Button } from "react-native";
import { updateStatus } from "./firebase";
import { primeiraMaiuscula } from "./Utils";


export const PropList = ({route, navigation}) => {
    const [dirty, setDirty] = useState(false);

    const renderItem = ({ item }) => {
        if (typeof item[1] === 'object') return <Menu key={item[0]} title={item[0]} />
        else return <Input key={item[0]} title={item[0]} value={item[1]} />
    }
    const Menu = ({ title }) => {
        return (
        <View style={styles.menuContainer}>
            <Text
                style={styles.menu}
                onPress={()=>navigation.navigate(route.name === "root" ? title : route.name + "/" + title )}>
                {primeiraMaiuscula(title)} {'>>'}
            </Text>
        </View>
        );
    }


    const Input = ({ title, value }) => {
        let input = <div />;
        switch (typeof value) {
            case "boolean":
                input = <Switch
                    onValueChange={(v)=>{route.params.data[title] = v; setDirty(true)}}
                    value={value}
                />
        
                break;
            case "string":
            default:
                input = <TextInput
                    style={styles.input}
                    defaultValue={value}
                    onChange = {(e)=>{route.params.data[title] = e.target.value; setDirty(true)}}
                />
                break;
        }
        return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{primeiraMaiuscula(title)}: </Text>
            {input}
        </View>
        );
    }

    const salvar = () => {
        if (route.name === "root") updateStatus(route.params.data)
        else updateStatus(route.params.data,route.name)
        setDirty(false);
    }
    return (
      <View>
        {dirty && <Button title="Salvar" onPress={salvar} />}
        <FlatList
          data={Object.entries(route.params.data)}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}      
        />
      </View>
    )
};

export const EntityList = ({route, navigation}) => {
    const renderItem = ({ item }) => <Menu key={item.key} item={item} />
    const Menu = ({ item }) => {
        return (
            <View style={styles.menuContainer}>
                <Text
                    style={styles.menu}
                    onPress={()=>navigation.navigate(item.key)}>
                    {primeiraMaiuscula(item.nome)}
                </Text>
            </View>
        )
    }

    return (
      <View>
        <FlatList
          data={route.params.data}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}      
        />
      </View>
    )
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 6,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  menu: {
    padding: 6,
    fontSize: 14,
  },
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
});