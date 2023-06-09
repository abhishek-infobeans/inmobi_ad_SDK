import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import Video from 'react-native-video';

const SDK = (props: any) => {
  const [media, setMedia] = useState<any>();

  useEffect(() => {
    getAD();
  }, []);

  const getAD = () => {
    const headers = {
      'x-api-key': 'ODFiNmUxODItMmMyNS00NTg4LWEyZTAtZDI3ZDAyNTY3MmQ2',
      'authority': 'ad-service.commerce.inmobi.com',
      'client-id': '70891516',
    };

    const data = {
      user: {
        guest_id: 'b908f460957b11ed81e1c53095da88cf',
        user_id: '',
        platform: { device_type: 'DESKTOP' },
        address: { zip_code: '10001' },
      },
      filter: {
        placements: [
          { ad_count: 2, id: 103 },
          { ad_count: 2, id: 117 },
        ],
        targeting_type: 'CATEGORY',
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

        props.getData(
          response.data.data.ads_data[0].ads[0].media_details[0].id
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const videoTapped = () => {
    props.advertisementTapped(media.id);
  };

  const height = parseInt('' + (Dimensions.get('window').width * 9) / 16);
  return (
    <>
      {media?.media_access_url ? (
        <>
          <Video
            source={{ uri: media?.media_access_url }} // Can be a URL or a local file.
            muted
            repeat
            posterResizeMode="cover"
            resizeMode="cover"
            style={{ height: height, width: '100%' }}
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
    </>
  );
};

export default SDK;
