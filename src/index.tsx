import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ProductAdView from './Components/ProductAdView';
import VideoAdView from './Components/VideoAdView';

const SDK = (props: any) => {
  const [media, setMedia] = useState<any>();
  const { apiKey, clientId, targetingType, userId } = props;

  useEffect(() => {
    getAD();
  }, []);

  const getAD = () => {
    const headers = {
      'x-api-key': apiKey,
      'authority': 'ad-service.commerce.inmobi.com',
      'client-id': clientId,
    };

    const data = {
      user: {
        guest_id: userId,
        user_id: '',
        platform: { device_type: 'DESKTOP' },
        address: { zip_code: '10001' },
      },
      filter: {
        placements: [
          { ad_count: 2, id: 103 },
          { ad_count: 2, id: 117 },
        ],
        targeting_type: targetingType,
        targeting_value_list: ['womens-sale'],
      },
      consent: { gdpr: true, ccpa: true, coppa: true },
    };

    axios
      .post(`https://ad-service.commerce.inmobi.com/v1/ads/bulk`, data, {
        headers: headers,
      })
      .then((response) => {
        // handle success
        setMedia(response.data.data.ads_data[0].ads[0].media_details[0]);
        console.log(response.data.data.ads_data[0].ads[0].media_details[0]);
        props.getData(
          response.data.data.ads_data[0].ads[0].media_details[0].id
        );
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

  const videoTapped = () => {
    props.advertisementTapped(media.id);
  };

  const productTapped = () => {
    props.advertisementTapped(media.id);
  };

  {
    if (media === undefined) {
      return null;
    }
  }

  return props?.isProduct ? (
    <ProductAdView
      media={media}
      sliderItemStyle={props.sliderItemStyle}
      sliderImgStyle={props.sliderImgStyle}
      sliderTextStyle={props.sliderTextStyle}
      sliderPriceStyle={props.sliderPriceStyle}
      productTapped={productTapped}
    />
  ) : (
    <VideoAdView
      media={media}
      videoTapped={videoTapped}
      adContainerStyle={props.style}
    />
  );
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
