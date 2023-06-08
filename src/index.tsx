import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

const SDK = (props) => {
  const [video, setVideo] = useState();
  const index = 2; //parseInt(props.id) % 10;
  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
      )
      .then((response) => {
        // handle success
        setVideo(response.data[index]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (!video) {
    return (
      <View>
        <ActivityIndicator size="large" color="#AAAAAA" />
      </View>
    );
  }

  return (
    <View>
      <VideoPlayer
        video={{
          uri: video?.videoUrl,
        }}
        videoWidth={1600}
        videoHeight={900}
        loop
        autoplay
        muted
        hideControlsOnStart
        disableSeek
        thumbnail={{ uri: video.thumbnailUrl }}
      />
      <View
        style={{
          backgroundColor: '#00000080',
          position: 'absolute',
          padding: 5,
          margin: 8,
        }}
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          Ad
        </Text>
      </View>
    </View>
  );
};

export default SDK;
