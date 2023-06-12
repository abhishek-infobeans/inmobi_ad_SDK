import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ProductAdView = (props: any) => {
  const {
    media,
    sliderItemStyle,
    sliderTextStyle,
    sliderPriceStyle,
    productTapped,
    sliderImgStyle,
  } = props;
  const mediaURL = media?.poster_access_url;

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
    <View style={sliderItemStyle}>
      <Image
        style={[{ resizeMode: 'contain' }, sliderImgStyle]}
        source={{ uri: mediaURL }}
      />
      <Text style={sliderTextStyle}>Ad Product</Text>
      <Text style={sliderPriceStyle}>$10</Text>
      <AdTag />
      <TouchableOpacity
        onPress={productTapped}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export default ProductAdView;
