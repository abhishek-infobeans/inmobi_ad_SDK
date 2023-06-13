import axios from 'axios';

export const LogEvents = (props: any) => {
  const { userId } = props;
  console.log('props', JSON.stringify(props, null, 2));
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
