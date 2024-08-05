import React, { useEffect, useState } from 'react';

const Push = () => {
//   const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js').then(registration => {
    //     console.log('Service Worker registered with scope:', registration.scope);
    //   }).catch(error => {
    //     console.error('Service Worker registration failed:', error);
    //   });
    // }
}, []);

//   const subscribeUserToPush = () => {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//       }).then(subscription => {
//         console.log('User is subscribed:', subscription);

//         fetch('', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ subscription })
//         })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Subscription sent to server:', data);
//         })
//         .catch(error => {
//           console.error('Error sending subscription to server:', error);
//         });
//       }).catch(error => {
//         console.error('Failed to subscribe the user:', error);
//       });
//     });
//   };

//   const handleSubscribe = () => {
//     if ('Notification' in window && navigator.serviceWorker) {
//       Notification.requestPermission().then(permission => {
//         if (permission === 'granted') {
//           console.log('Notification permission granted.');
//           subscribeUserToPush();
//         } else {
//           console.log('Notification permission denied.');
//         }
//       });
//     }
//   };

//   const handleSendTestNotification = () => {
//     fetch('http://127.0.0.1:8000', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         title: 'Test Notification',
//         message: 'This is a test notification sent from the server!'
//       })
//     }).then(response => response.json())
//       .then(data => {
//         console.log('Test notification sent:', data);
//       })
//       .catch(error => {
//         console.error('Error sending test notification:', error);
//       });
//   };

//   const handleFetchNotifications = () => {
//     fetch('http://127.0.0.1:8000')
//       .then(response => response.json())
//       .then(data => {
//         setNotifications(data);
//       })
//       .catch(error => {
//         console.error('Error fetching notifications:', error);
//       });
//   };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div>
      <div id="notifications">
      </div>
    </div>
  );
};

export default Push;