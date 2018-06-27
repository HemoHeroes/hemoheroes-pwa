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
                './assets/images/114x114.png',
                './assets/images/144x144.png',
                './assets/images/180x180.png',
                './assets/images/310x310.png',
                './assets/images/48x48.png',
                './assets/images/60x60.png',
                './assets/images/76x76.png',
                './assets/images/120x120.png',
                './assets/images/152x152.png',
                './assets/images/192x192.png',
                './assets/images/36x36.png',
                './assets/images/57x57.png',
                './assets/images/72x72.png',
                './assets/images/96x96.png',
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

