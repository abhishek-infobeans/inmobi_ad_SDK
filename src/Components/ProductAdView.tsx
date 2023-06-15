import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductAdView = (props: any) => {
  const {
    productItem,
    sliderItemStyle,
    sliderTextStyle,
    sliderPriceStyle,
    productTapped,
    sliderImgStyle,
  } = props;
  const mediaURL = productItem?.image_urls[0];
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
    <View style={[styles.sliderItem, sliderItemStyle]}>
      <Image
        style={[styles.sliderImg, sliderImgStyle]}
        source={{ uri: mediaURL }}
      />
      <Text style={[styles.sliderText, sliderTextStyle]}>
        {productItem?.title}
      </Text>
      <Text style={[styles.sliderPrice, sliderPriceStyle]}>$10</Text>
      <AdTag />
      <TouchableOpacity onPress={productTapped} style={styles.adClick} />
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

  sliderItem: {
    width: 150,
    marginLeft: 10,
  },

  sliderImg: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },

  sliderText: {
    fontWeight: '600',
  },

  sliderPrice: {
    fontWeight: '400',
  },
  adClick: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default ProductAdView;
