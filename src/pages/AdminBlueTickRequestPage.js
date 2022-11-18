import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getAllBlueTickRequests} from '../api/AdminApi';
import {Blank, imageDrawer, LoadingImage, ProfilePicture, TwitterIcon} from '../assets';
import {AdminBlueTickRequestCard} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AdminBlueTickRequestPage({navigation}) {
  const [allBlueTickRequests, setAllBlueTickRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
  async function fetchallBlueTickRequests() {
    const data = await getAllBlueTickRequests();
    setAllBlueTickRequests(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchallBlueTickRequests();
  }, [isFocused]);
  return (
    <>
      {isLoading ? (
        <Image source={LoadingImage} style={styles.loading} />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.headerIconContainer}
              onPress={() => navigation.openDrawer()}>
              <Image source={imageDrawer} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconContainer}
              onPress={() => fetchallBlueTickRequests()}>
              <Image source={TwitterIcon} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconContainer}>
              <Image source={Blank} style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContainer}>
            <FlatList
              data={allBlueTickRequests}
              renderItem={({item}) => (
                <AdminBlueTickRequestCard key={item.userId} data={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  loading: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginVertical: '50%',
  },
  bodyContainer: {flex: 20, margin: 5, padding: 5},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIconContainer: {margin: 5},
  headerIcon: {height: 45, width: 45, resizeMode: 'contain', borderRadius: 10},
});
