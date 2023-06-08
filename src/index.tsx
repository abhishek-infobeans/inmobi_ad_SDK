import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

const SDK = (props) => {
  const [video, setVideo] = useState();
  // const index = 2; //parseInt(props.id) % 10;
  useEffect(() => {
    const headers = {
      'x-api-key': 'ODFiNmUxODItMmMyNS00NTg4LWEyZTAtZDI3ZDAyNTY3MmQ2',
      'X-Host': 'inmobi.com',
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
        setVideo(response.data.ads_data[0].ads[0].media_details);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (!video) {
    return (
      <View>
        <ActivityIndicator size="large" color="#AAAAAA" />
      </View>
    );
  }

  return (
    <View>
      <VideoPlayer
        video={{
          uri: video?.media_access_url,
        }}
        videoWidth={1600}
        videoHeight={900}
        loop
        autoplay
        muted
        hideControlsOnStart
        disableSeek
        thumbnail={{ uri: video?.poster_access_url }}
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
  );
};

export default SDK;
