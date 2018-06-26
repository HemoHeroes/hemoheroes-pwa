const VERSION = 'hemoheroes@v2-alpha' + new Date().getMilliseconds();

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject) => {
        caches.open(VERSION).then(cache => {
            return cache.addAll([
                './',
                './assets/css/material.woff2',
                './assets/css/materialize.min.css',
                './assets/css/style.css',
                './assets/js/jquery.js',
                './assets/js/materialize.min.js',
                './assets/js/pages.js',
                './assets/js/notifications.js',
                './assets/js/map.js',
                './assets/js/http.js',
                './assets/js/init.js',
                './assets/images/blood-donators.jpg',
                './assets/images/donationhand.jpg',
                './assets/images/hemoheroes-logo.png',
                './assets/images/hospital.jpg',
                './assets/images/Logo-email.png',
                './assets/images/favicon.ico',
                './index.html',
                './404.html',
                './views/about.html',
                './views/canDonate.html',
                './views/home.html',
                './views/iHospital.html',
                './views/login.html',
                './views/requireDonate.html',
                './views/wantDonate.html'
            ]).then(_ => {
                console.log('INSTALLED ' + VERSION);
                self.skipWaiting();
                resolve();
            }).catch(err => {
                console.log('Não deu!', err);
            })
        })
    }))
})

self.addEventListener('activate', event => {
    event.waitUntil(new Promise((resolve, reject) => {
        caches.keys().then(keysList => {
            return Promise.all(keysList.map(cacheKey => {
                if (cacheKey !== VERSION) {
                    return caches.delete(cacheKey)
                }
            })).then(_ => {
                console.log('ACTIVATED ' + VERSION)
                resolve()
            })
        })
    }))
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
            .catch(
                () => {
                    return caches.match('./404.html');
                }
            );
        }).catch(function() {
            return caches.match('./404.html');
        })
    );
});

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "./assets/images/Logo-email.png"
    });
});

self.addEventListener('notificationclick',function(event){event.notification.close();event.waitUntil(self.clients.openWindow('https://www.hemoheroes.com/'))})

