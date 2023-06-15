import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

const height = parseInt('' + (Dimensions.get('window').width * 9) / 16);

const VideoAdWithProductDetails = (props: any) => {
  const { media, videoTapped, adContainerStyle, productDetails } = props;
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
  const ProductDetailView = () => {
    return (
      <View
        style={{
          flex: 3,
          backgroundColor: '#ffffff',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontWeight: '600', padding: 8, textAlign: 'left' }}>
          {productDetails?.title ?? 'Title'}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            padding: 8,
            textAlign: 'left',
            fontSize: 16,
          }}
        >
          ${productDetails?.price.amount ?? 'Price'}
        </Text>
      </View>
    );
  };

  const Loader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#cccccc',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={[adContainerStyle, { flexDirection: 'row' }]}>
      <View style={{ flex: 2, backgroundColor: 'black' }}>
        {mediaURL ? (
          <>
            <Video
              source={{ uri: mediaURL }} // Can be a URL or a local file.
              muted
              repeat
              posterResizeMode="contain"
              resizeMode="contain"
              style={styles.videoStyle}
            />
            <AdTag />
          </>
        ) : null}
      </View>
      {productDetails ? ProductDetailView() : Loader()}
      <TouchableOpacity onPress={videoTapped} style={styles.clickStyle} />
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
    height: 120,
    width: '100%',
  },
  clickStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default VideoAdWithProductDetails;
