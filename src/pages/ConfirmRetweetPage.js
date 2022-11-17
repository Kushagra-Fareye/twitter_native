import {View, Text} from 'react-native';
import React from 'react';
import {TweetCard} from '../components';

export default function ConfirmRetweetPage({navigation, route}) {
  const {tweet} = route.params;
  return (
    <View>
      <TweetCard tweet={tweet} />
    </View>
  );
}
