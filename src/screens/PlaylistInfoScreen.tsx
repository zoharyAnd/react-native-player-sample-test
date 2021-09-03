import React, { useState, useMemo } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PlaylistAPI from '../api/PlaylistAPI';
import { getNumberUnit } from '../utils/number';
import { AntDesign } from '@expo/vector-icons'; 

const PlaylistInfoScreen = (props) => {
  const [details, setDetails] = useState<any>();
  const [play, setPlay] = useState<boolean>(false);
  const [song, setSong] = useState<any>();

  useMemo(() => {
    PlaylistAPI.getPlayListDetails(props.route.params.playlistId).then((r: any) => {
      setDetails(r)
    });
  }, []);

  const renderSong = (item: any) => (
    <>
      <Text style={item.track.preview_url === null ? styles.textDarkGray : styles.textWhite}>{item.track.name}</Text>
      <Text style={item.track.preview_url === null ? styles.textDarkGray : styles.textGray}>
        {item.track.artists.map((artist: any) => `${artist.name} | `)}
      </Text>
    </>
  );

  return (
    <>
      {details ? (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{uri: details.images[0].url}} style={styles.cover} />
            <View style={styles.metaWrapper}>
              <Text style={styles.title}>{details.name}</Text>
              <Text style={styles.textGray}>{`Playlist by ${details.owner.display_name}`}</Text>
              <Text style={styles.textWhite}>{details.description}</Text>
              <Text style={styles.textGray}>{`${getNumberUnit(details.followers.total)} followers`}</Text>
            </View>
          </View>
          <ScrollView style={styles.container}>
            {details.tracks && details.tracks.items.map((track: any) => (
              <TouchableOpacity 
                key={track.track.uri} 
                style={styles.track} 
                disabled={track.track.preview_url === null}
                onPress={() => { if (track.track.preview_url !== null) {
                  setSong(track);
                  setPlay(true);
                }}}>
                  {renderSong(track)}
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* if there is a chosen  song */}
          {song && (
            <View style={styles.selectedSong}>
              <View>
                {renderSong(song)}
              </View>
              <TouchableOpacity 
                style={styles.track} 
                onPress={() => setPlay(!play)}>
                  {play === false ? <AntDesign name="play" size={24} color="white" /> : <AntDesign name="pause" size={24} color="white" /> }
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.centeredView}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) }
    </>
  );
};

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
  },
  metaWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    height: 140
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  textGray: {
    fontSize: 18,
    color: 'gray'
  },
  textDarkGray: {
    color: '#3c4043'
  },
  textWhite: {
    fontSize: 18,
    color: 'white'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 160,
    padding: 15
  },
  cover: {
    width: screenWidth /3,
    height: 140
  },
  track: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 3
  },
  selectedSong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: 'green',
    borderTopWidth: 2,
    height: 60,
    padding: 10
  },
});

export default PlaylistInfoScreen;