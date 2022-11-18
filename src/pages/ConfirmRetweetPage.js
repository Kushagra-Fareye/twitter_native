import {View, Text} from 'react-native';
import React from 'react';
import {TweetCard} from '../components';
import StaticTweetCard from '../components/StaticTweetCard';

export default function ConfirmRetweetPage({navigation, route}) {
  const {tweet} = route.params;
  return (
    <View>
      <StaticTweetCard tweet={tweet} />
    </View>
  );
}
