import React, { useEffect, useState } from 'react';

const Push = () => {
  const [vapidKey, setVapidKey] = useState(null);

  // Base64 문자열을 Uint8Array로 변환하는 함수
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // VAPID 키를 가져오는 비동기 함수
  const fetchVapidKey = async () => {
    try {
      const response = await fetch('http://172.30.1.85:8081/vapid-public-key');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response");
      }
      const data = await response.json();
      setVapidKey(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // 서비스 워커를 등록하는 비동기 함수
  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return;

    let registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      registration = await navigator.serviceWorker.register('/service-worker.js');
    }
  };

  // 사용자 구독을 처리하는 함수
  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        await existingSubscription.unsubscribe();
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey.public_key)
      });

      console.log('User is subscribed:', newSubscription);
      const {endpoint} = newSubscription
      const response = await fetch('http://172.30.1.85:8081/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endpoint: endpoint, public_key: vapidKey.public_key, private_key: vapidKey.private_key, user_id: 'string'})
      });

      const data = await response.json();
      console.log('Subscription sent to server:', data);

    } catch (error) {
      console.error('Failed to subscribe the user:', error);
    }
  };

  const init = async () => {
    await fetchVapidKey();
    await registerServiceWorker();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (vapidKey) {
      subscribeUser();
    }
  }, [vapidKey]);

  return (
    <div>
      {vapidKey ? (
        <div>
          <p>Vapid Public Key: {vapidKey.public_key}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Push;
