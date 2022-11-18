import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {blueTickResponse} from '../api/AdminApi';

export default function AdminBlueTickRequestCard(props) {
  
  const {data} = props;
  async function handleAcceptButtonClick() {
    await blueTickResponse(data,true);
  }
  async function handleDeclineButtonClick() {
    console.log(data,"fghjklkjhgfghjk");
    await blueTickResponse(data,false);
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.nameContainer}>
        <Text style = {{fontWeight: 'bold', color: 'black'}}>{props.data.name}</Text>
        <Text>@{props.data.userName}</Text>
        
      </View>

      <View style={styles.buttonContainer}>
        <Text
          onPress={() => {
            handleAcceptButtonClick();
          }}
          style={{color: 'green', fontWeight: 'bold'}}>
          Accept
        </Text>
        <Text
          onPress={() => {
            handleDeclineButtonClick();
          }}
          style={{color: 'red', fontWeight: 'bold'}}>
          Decline
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 40,
    elevation: 4,
    borderColor: 'black',
  },
  nameContainer: {
    flex: 6,
  },
  buttonContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
