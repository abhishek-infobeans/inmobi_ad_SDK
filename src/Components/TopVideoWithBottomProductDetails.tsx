import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Video from 'react-native-video';

const height = parseInt('' + (Dimensions.get('window').width * 9) / 16);

const TopVideoWithBottomProductDetails = (props: any) => {
  const { media, videoTapped, adContainerStyle, productDetails } = props;
  const mediaURL = media?.media_access_url;
  console.log('media & prodetails', media);
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
    console.log('productDetails', productDetails);
    return (
      <View style={[{ flexDirection: 'row' }]}>
        <View
          style={{
            backgroundColor: '#ffffff',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Image
            style={styles.productImage}
            source={{ uri: productDetails?.image_urls[0] }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Text style={{ color: '#bbbbbb', padding: 8 }}>sponsored</Text>
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
      </View>
    );
  };

  const Loader = () => {
    return (
      <View
        style={{
          backgroundColor: '#cccccc',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  console.log('productDetails', productDetails);

  return (
    <View style={[adContainerStyle, { flexDirection: 'column' }]}>
      <View style={{ backgroundColor: 'black' }}>
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
    height: height,
    width: '100%',
  },
  clickStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  productImage: {
    width: 120,
    height: 120,
  },
});

export default TopVideoWithBottomProductDetails;
