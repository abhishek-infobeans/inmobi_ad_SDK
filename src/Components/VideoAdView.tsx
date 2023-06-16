import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';

const height = parseInt('' + (Dimensions.get('window').width * 9) / 16);

const VideoAdView = (props: any) => {
  const { media, videoTapped, adContainerStyle } = props;
  const mediaURL = media?.media_access_url;
  const AdTag = () => {
    return (
      <View style={styles.adStyle}>
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
            style={styles.videoStyle}
          />
          <AdTag />
          <TouchableOpacity onPress={videoTapped} style={styles.clickStyle} />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  adStyle: {
    backgroundColor: '#00000080',
    position: 'absolute',
    padding: 5,
    margin: 8,
  },
  videoStyle: {
    height: height,
    width: '100%',
  },
  clickStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default VideoAdView;
