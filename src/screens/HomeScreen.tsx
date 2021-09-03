import React, { useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import PlaylistAPI from '../api/PlaylistAPI';

const HomeScreen = (props) => {
  const [title, setTitle] = useState<string>('');
  const [playlists, setPlaylists] = useState<any>();
  
  useMemo(() => PlaylistAPI.getFeaturedPlaylist().then((r: any) => {
    setTitle(r.message);
    setPlaylists(r.playlists);
  }), []);
  
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <View style={styles.row}>
        {playlists && playlists.items.map((playlist: any) => (
          <TouchableOpacity key={playlist.uri} style={styles.card} onPress={() => {
            props.navigation.navigate('Playlist', { playlistId: playlist.id })
          }}>
            <Image source={{uri: playlist.images[0].url}} style={styles.cover} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    height: 60,
    marginTop: 50,
    padding: 7
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    width: screenWidth /2,
    height: 210
  },
  cover: {
    width: screenWidth /2.1,
    height: 200,
  }
});

export default HomeScreen;
