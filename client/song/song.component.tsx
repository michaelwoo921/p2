import React from 'react';
import { Song } from './song';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from '../global-styles';
import { useDispatch } from 'react-redux';


// Define the properties that are being passed to this component
interface SongProps {
    data: Song;
}
// View Component with only a little functionality
function SongComponent({data}: SongProps) {
    // Using the useNavigation hook to get access to the ReactNavigation component.
    const nav = useNavigation();
    const dispatch = useDispatch();

    // callback function for our button.
    function goToSong() {
        // dispatch(changeSong(props.data));
        // passing our restaurant to the RestaurantDetail screen and going there.
        nav.navigate('SongDetail', data);
    }

    // The JSX we wish to render.
    return (
        <View style={styles.container}>
        
        <Text>{data.artist}</Text>
      
        <Text>Number of Clicks: {data.clicks}</Text>
        <Text>{data.title}</Text>
        <Button title='songdetail' onPress={goToSong} />
    </View>
    );
}

export default SongComponent;
