import { useState, useEffect } from 'react';
import { openWebsocketConnection, closeWebsocketConnection, subscribeToUpdates, unsubscribeFromUpdates, fetchNewData } from 'my-api';

const useRealtimeUpdates = (params) => {
  const [data, setData] = useState(null);

  // Open websocket connection on mount
  useEffect(() => {
    const connection = openWebsocketConnection(params);

    // Subscribe to real-time updates when connection is open
    const subscription = subscribeToUpdates(connection, (update) => {
      setData(update);
    });

    // Unsubscribe and close connection on unmount
    return () => {
      unsubscribeFromUpdates(subscription);
      closeWebsocketConnection(connection);
    };
  }, [params]);

  // Poll for new data every 30 seconds when user is inactive or app is closed
  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchNewData(params);
      setData(newData);
    }, 30000);

    return () => clearInterval(interval);
  }, [params]);

  return data;
};
