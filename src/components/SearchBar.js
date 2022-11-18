import { View, TextInput,TouchableOpacity,Image,Text, StyleSheet} from "react-native";
import React from "react";

export default function SearchBar(){
  return(
    <View style = {styles.container}> 
      <TextInput
      placeholder="Search"
      style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#F0F0F0",
    margin: 10,
    width:'85%',
  },
  input: {
      backgroundColor: '#fff',
      padding: 10,
      color: '#000',
      borderRadius: 10,
      borderWidth: 1,
      // flex: 1
  }
});
