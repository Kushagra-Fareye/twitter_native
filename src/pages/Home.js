import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddIcon,
  imageDrawer,
  LoadingImage,
  ProfilePicture,
  HomeIcon,
  SortIcon,
  TwitterIcon,
} from '../assets';
import {TweetCard} from '../components';
import {getSortedFeed, getUserFeed} from '../api/Feed';
import {FeedString, SortTypes, SortTypeString} from '../constants/Feed';
import {useIsFocused} from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SortDropdown = props => {
  const {showDropdown, toggleDropdown, fetchSortedFeed} = props;

  return (
    <View style={styles.sortDropdown}>
      <Modal
        visible={showDropdown}
        onRequestClose={() => {
          toggleDropdown(false);
        }}
        transparent={true}>
        <Text
          styles={styles.sortButton}
          onPressOut={() => {
            // fetchSortedFeed(SortTypes.DATE);
            // toggleDropdown(false);
          }}>
          {SortTypeString.DATE}
        </Text>
        <Text
          styles={styles.sortButton}
          onPress={() => {
            fetchSortedFeed(SortTypes.POPULARITY);
            toggleDropdown(false);
          }}>
          {SortTypeString.POPULARITY}
        </Text>
      </Modal>
    </View>
  );
};

const Tab = createBottomTabNavigator();
let userId = 1;
export default function Home({navigation}) {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, toggleDropdown] = useState(false);

  const isFocused = useIsFocused();

  async function fetchFeed() {
    console.log("home");
    const data = await getUserFeed(userId);
    setFeedData(data);
    setIsLoading(false);
  }
  async function fetchSortedFeed(sortType) {
    const data = await getSortedFeed(userId, sortType);
    setFeedData(data);
  }
  useEffect(() => {
    fetchFeed();
  }, [isFocused]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={() => navigation.openDrawer()}>
            <Image source={imageDrawer} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={() => fetchFeed('Ransom')}>
            <Image source={TwitterIcon} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={() => toggleDropdown(prev => !prev)}>
            <Image source={SortIcon} style={styles.headerIcon2} />
          </TouchableOpacity>
        </View>
        {showDropdown && (
          <View style={styles.sortDropdown}>
            <SortDropdown
              toggleDropdown={toggleDropdown}
              showDropdown={showDropdown}
              fetchSortedFeed={fetchSortedFeed}
            />
          </View>
        )}

        <View style={styles.bodyContainer}>
          {isLoading ? (
            <View style={{flex: 1, marginVertical: '50%',  justifyContent: 'center'}}>
              <ActivityIndicator size={'large'} color="rgba(42,169,224,255)" />
            </View>
          ) : (
            <FlatList
              data={feedData}
              renderItem={({item}) => (
                <TweetCard
                  tweet={item}
                  key={item.tweetId}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item.tweetId}
              ListEmptyComponent={
                <Text style={styles.emptyList}>{FeedString.EMPTY_FEED}</Text>
              }
            />
          )}
        </View>
        {/* <View style={styles.addTweetButtonContainer}> */}
        {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('MessagesPage', {screen: 'Add Tweet Page'})
            }>
            <Image source={AddIcon} style={styles.addTweetButton} />
          </TouchableOpacity> */}
        {/* </View> */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('MessagesPage', {screen: 'Add Tweet Page'})
          }>
          <Text
            style={{
              fontSize: 50,
              margin: -7,
              color: 'white',
              fontWeight: '100',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginVertical: '50%',
  },
  mainContainer: {flex: 1, width: screenWidth},

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  headerIconContainer: {marginHorizontal: 10},
  headerIcon: {height: 45, width: 45, resizeMode: 'contain',},
  headerIcon2: {height: 35, width: 35, resizeMode: 'contain', marginTop: 5},

  bodyContainer: {
    marginBottom: 45,
  },
  sortDropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    // elevation: 5,
    padding: 10,
    height: 50,
    width: 300,
    alignItems: 'center',
  },
  sortButton: {},
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  // addTweetButtonContainer: {
  //   position: 'absolute',
  //   bottom: 12,
  //   right: 12,
  //   backgroundColor: 'rgba(42,169,224,255)',
  //   borderRadius: 50,
  // },
  // addTweetButton: {
  //   margin: 8,
  //   height: 40,
  //   width: 40,
  // },

  addButton: {
    backgroundColor: 'rgba(42,169,224,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
    position: 'absolute',
    right: 35,
    bottom: 30,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
});
