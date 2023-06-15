import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ProductAdView from './Components/ProductAdView';
import VideoAdView from './Components/VideoAdView';
import VideoAdWithProductDetails from 'react-native-inmobi_ad_sdk/src/Components/VideoAdWithProductDetails';
import TopVideoWithBottomProductDetails from 'react-native-inmobi_ad_sdk/src/Components/TopVideoWithBottomProductDetails';

const SDK = (props: any) => {
  const [brandMedia, setBrandMedia] = useState<any>();
  const [productMedia, setProductMedia] = useState<any>();
  const { apiKey, clientId, targetingType, userId, adType, isProduct } = props;
  const [productDetail, setProductDetail] = useState<any>();
  const [productSKU, setProductSKU] = useState<any>();

  // const uat_xAPIKey = "ZDQ3YTcyMTctZmI0ZC00NjJhLWJiODMtNGFjMGExZDIxYzBj";
  // const uat_clientId = "70891516";
  // const uat_productAdurl = "https://uat-ads.commerce.inmobi.com/v1/ads/bulk"
  // const uat_productDetailsURL = "https://uat-ads.commerce.inmobi.com/api/v1/retailer"
  // const uat_AdData = { "user": { "guest_id": "7aac8fb0c3c711ed8f3dd1a03e907612", "iccs_id": "c1f4e04e-b5aa-486d-8405-3d96d85a8597", "user_id": "", "platform": { "device_type": "DESKTOP" }, "address": { "zip_code": "10001" } }, "filter": { "placements": [{ "ad_count": 1, "id": 216 }], "targeting_type": "PAGE", "targeting_value_list": ["HOME"] }, "consent": { "gdpr": true, "ccpa": true, "coppa": true } };
  // const uat_SKU = "6107B330168080";

  const prod_xAPIKey = 'ODFiNmUxODItMmMyNS00NTg4LWEyZTAtZDI3ZDAyNTY3MmQ2';
  const prod_clientId = '70891516';
  const prod_productAdurl =
    'https://ad-service.commerce.inmobi.com/v1/ads/bulk';
  const prod_productDetailsURL =
    'https://ad-service.commerce.inmobi.com/api/v1/retailer/';
  const prod_AdData = {
    user: {
      guest_id: '87281370e1ef11ed9119bb8e702b7726',
      user_id: '',
      platform: { device_type: 'DESKTOP' },
      address: { zip_code: '10001' },
    },
    filter: {
      placements: [
        { ad_count: 2, id: 104 },
        { ad_count: 2, id: 116 },
      ],
      targeting_type: 'KEYWORD',
      targeting_value_list: ['shapewear'],
    },
    consent: { gdpr: true, ccpa: true, coppa: true },
  };
  const prod_SKU = '1624F0185179209';

  const xAPIKey = prod_xAPIKey;
  const apiClientId = prod_clientId;
  const productAdurl = prod_productAdurl;
  const productDetailsURL = prod_productDetailsURL;
  const productADdata = prod_AdData;
  const productAPISKU = prod_SKU;

  useEffect(() => {
    if (
      adType === 'productVideoAd' ||
      adType === 'VideoAdWithProductDetails' ||
      adType === 'ProductItem' ||
      adType === 'TopVideoWithBottomProductDetails'
    ) {
      getProductVideoAD();
    } else {
      getBrandAD();
    }
  }, []);

  const shouldGetProductDetails = () => {
    return (
      adType === 'VideoAdWithProductDetails' ||
      adType === 'ProductItem' ||
      adType === 'TopVideoWithBottomProductDetails'
    );
  };

  const getBrandAD = () => {
    const headers = {
      'x-api-key': 'MTEyM2RhNWUtNTc3Ni00NjcwLWFiMDgtNzdmMzUyMjhiZGU1',
      'authority': 'uat-ads.commerce.inmobi.com',
      'client-id': '4987041',
    };

    const brandAdURL = 'https://uat-ads.commerce.inmobi.com/v1/ads';

    const data = {
      user: {
        guest_id: 'fca2030259ea1d92327f54db84',
        user_id: 'fca2030259ea1d92327f54db84',
        platform: {
          device_type: 'DESKTOP',
        },
      },
      filter: {
        ad_count: 3,
        placement_id: 296,
        targeting_type: 'KEYWORD',
        targeting_value_list: ['Mobiledemo'],
      },
      consent: { gdpr: true, ccpa: true, coppa: true },
    };

    axios
      .post(brandAdURL, data, {
        headers: headers,
      })
      .then((response) => {
        // handle success
        setBrandMedia(response.data.data.ads[0].media_details[0]);
        props.getData(response.data.data.ads[0].media_details[0].id);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getProductVideoAD = () => {
    const headers = {
      'x-api-key': xAPIKey,
      'authority': 'uat-ads.commerce.inmobi.com',
      'client-id': apiClientId,
      'content-type': 'application/json',
    };

    const productAdURL = productAdurl;
    const data = productADdata;

    axios
      .post(productAdURL, data, {
        headers: headers,
      })
      .then((response) => {
        // handle success
        console.log('VideoAd===', response.data.data.ads_data[0]);
        setProductMedia(response.data.data.ads_data[0].ads[0].media_details[0]);
        if (response.data.data.ads_data[0].ads[0].skus[0].id) {
          setProductSKU('123');
          if (shouldGetProductDetails()) {
            // getProductDetailsAD(response.data.data.ads[0].skus[0].id, 70891516)
            getProductDetailsAD(productAPISKU, apiClientId);
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getProductDetailsAD = (skuId: any, retailerId: any) => {
    const headers = {
      'x-api-key': xAPIKey,
      // 'authority': 'uat-ads.commerce.inmobi.com',
      // 'client-id': "4987041",
      'content-type': 'application/json',
    };

    const productDetailURL = `${productDetailsURL}${retailerId}/catalog/productDetails?skuIds=${skuId}`;

    let config = {
      headers: headers,
      params: {},
    };
    console.log('Product details API called', productDetailURL);
    axios
      .get(productDetailURL, config)
      .then((response) => {
        // handle success
        console.log('Product details response', response.data);
        setProductDetail(response.data.products[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const postEvent = () => {
    const headers = {
      'x-api-key': 'ZDQ3YTcyMTctZmI0ZC00NjJhLWJiODMtNGFjMGExZDIxYzBj',
      'authority': 'ad-service.commerce.inmobi.com',
      'client-id': '70891516',
    };

    const data = {
      user: {
        guest_id: userId,
        user_id: '',
        platform: { device_type: 'DESKTOP' },
      },
      page_details: {
        referrer_url: '',
        source_url: 'https://test-lord-and-taylor.myshopify.com/',
        pagination_index: 1,
      },
      event_type: 'VIEW_HOME',
      event_timestamp: '1686637517',
    };

    axios
      .post(`https://uat-t.commerce.inmobi.com/v1/cads/events`, data, {
        headers: headers,
      })
      .then((response) => {
        // handle success
        console.log('ClickStream Response ', response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const brandVideoTapped = () => {
    props.advertisementTapped(brandMedia.id);
  };

  const productVideoTapped = () => {
    props.advertisementTapped(brandMedia.id);
  };

  const productTapped = () => {
    props.advertisementTapped(brandMedia.id);
  };
  {
    if (productMedia === undefined && brandMedia === undefined) {
      console.log('returned ++++++');
      return null;
    }
  }

  switch (adType) {
    case 'ProductAdView':
      return (
        <ProductAdView
          productItem={productDetail}
          sliderItemStyle={props.sliderItemStyle}
          sliderImgStyle={props.sliderImgStyle}
          sliderTextStyle={props.sliderTextStyle}
          sliderPriceStyle={props.sliderPriceStyle}
          productTapped={productTapped}
        />
      );
    case 'VideoAdWithProductDetails':
      return (
        <VideoAdWithProductDetails
          media={productMedia}
          videoTapped={productVideoTapped}
          adContainerStyle={props.style}
          skuId={productSKU}
          productDetails={productDetail}
        />
      );
    case 'TopVideoWithBottomProductDetails':
      return (
        <TopVideoWithBottomProductDetails
          media={productMedia}
          videoTapped={productVideoTapped}
          adContainerStyle={props.style}
          skuId={productSKU}
          productDetails={productDetail}
        />
      );
    case 'BrandAdView':
      return (
        <VideoAdView
          media={brandMedia}
          videoTapped={brandVideoTapped}
          adContainerStyle={props.style}
        />
      );

    default:
      break;
  }

  // return isProduct !== undefined && isProduct ? (

  //   <ProductAdView
  //     productItem={productDetail}
  //     sliderItemStyle={props.sliderItemStyle}
  //     sliderImgStyle={props.sliderImgStyle}
  //     sliderTextStyle={props.sliderTextStyle}
  //     sliderPriceStyle={props.sliderPriceStyle}
  //     productTapped={productTapped}
  //   />
  // ) : (adType === "VideoAdWithProductDetails" ? (
  //     <TopVideoWithBottomProductDetails
  //   // <VideoAdWithProductDetails
  //     media={media}
  //     videoTapped={videoTapped}
  //     adContainerStyle={props.style}
  //     skuId={productSKU}
  //     productDetails={productDetail}
  //     />):(
  //       <VideoAdView
  //       media={media}
  //       videoTapped={videoTapped}
  //       adContainerStyle={props.style}
  //     />)
  // );
};

export default SDK;

/*
API 
     'x-api-key': 'ODFiNmUxODItMmMyNS00NTg4LWEyZTAtZDI3ZDAyNTY3MmQ2',
      'client-id': '70891516',
      "guest_id": 'b908f460957b11ed81e1c53095da88cf',
      targeting_type: 'CATEGORY',
      targeting_value_list: ['womens-sale'],
*/
