/// <reference lib="webworker" />
  
  function log (...args) {
    console.log('service-worker:', ...args);
  }
  
  ((self) => {
  
    self.addEventListener('install', (event) => {
      log('install', { event });
      event.waitUntil(self.skipWaiting());
    });
    
    self.addEventListener('activate', (event) => {
      log('activate', { event });
    });
    
    self.addEventListener('push', (event) => {
      log('push', { event });
    
      const message = event.data?.json()

      event.waitUntil(
        self.registration.showNotification(message.title, {
          body: message.body,
        })
      );
    });
    
    self.addEventListener('notificationclick', (event) => {
      log('notificationclick', { event });
      self.clients.openWindow('https//localhost:3001/main');
    });
  
  })(self);