import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';

const VideoAdView = (props: any) => {
  const { media, videoTapped, adContainerStyle } = props;
  const mediaURL = media?.media_access_url;

  const height = parseInt('' + (Dimensions.get('window').width * 9) / 16);

  const AdTag = () => {
    return (
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
    );
  };

  return (
    <View style={[adContainerStyle]}>
      {mediaURL ? (
        <>
          <Video
            source={{ uri: mediaURL }} // Can be a URL or a local file.
            muted
            repeat
            posterResizeMode="cover"
            resizeMode="cover"
            style={{ height: height, width: '100%' }}
          />
          <AdTag />
          <TouchableOpacity
            onPress={videoTapped}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        </>
      ) : null}
    </View>
  );
};

export default VideoAdView;
