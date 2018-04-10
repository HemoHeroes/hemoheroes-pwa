const VERSION = 'hemoheroes@v2-'+new Date().getMilliseconds();

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject) => {
    	caches.open(VERSION).then(cache => {
    		return cache.addAll([
                '/',
                '/assets/css/materialize.min.css',
                '/assets/css/materialize.css',
                '/assets/css/style.css',
                '/assets/js/jquery.js',
                '/assets/js/materialize.min.js',
                '/assets/js/materialize.js',
                '/assets/js/pages.js',
                '/assets/js/notifications.js',
                '/assets/js/map.js',
                '/assets/js/http.js',
                '/assets/js/init.js',
                '/assets/images/blood-donators.jpg',
                '/assets/images/donationhand.jpg',
                '/assets/images/hemoheroes-logo.png',
                '/assets/images/hospital.jpg',
                '/assets/images/Logo-email.png',
                '/index.html',
                '/views/about.html',
                '/views/canDonate.html',
                '/views/home.html',
                '/views/iHospital.html',
                '/views/login.html',
                '/views/wantDonate.html',
                'https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
                'https://fonts.googleapis.com/icon?family=Material+Icons'
    		]).then(_ => {
    			console.log('INSTALLED ' + VERSION);
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

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)
    const errorPage = './404.html'
    console.log('Requisitou: ', event.request.url)
    return event.respondWith(
        caches.match(event.request).then(response => {
        	return response || fetch(event.request).then(response => {
        		if (response.ok) {
        			caches.open(VERSION).then(cache => {
        				cache.put(event.request, response)
        			})
        			return response.clone()
        		} else {
        			return caches.match(errorPage)
        		}
        	})
        }).catch(
            x => {
                console.log("X", x)
                return caches.match(errorPage)
            }
        )
    )
});







