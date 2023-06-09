import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Text, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

const SDK = (props: any) => {
  const [media, setMedia] = useState();

  console.log('props', props);

  useEffect(() => {
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
  }, []);

  if (!media) {
    return (
      <View>
        <ActivityIndicator size="large" color="#AAAAAA" />
      </View>
    );
  }

  const videoTapped = () => {
    props.advertisementTapped(media.id);
  };

  return (
    <TouchableOpacity onPress={videoTapped}>
      <View>
        <VideoPlayer
          video={{
            uri: media?.media_access_url,
          }}
          videoWidth={1600}
          videoHeight={900}
          loop
          autoplay
          muted
          hideControlsOnStart
          disableSeek
          thumbnail={{ uri: media?.poster_access_url }}
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
    </TouchableOpacity>
  );
};

export default SDK;
