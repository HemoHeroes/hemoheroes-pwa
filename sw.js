const VERSION = 'hemoheroes@v2-'+new Date().getMilliseconds();

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject) => {
    	caches.open(VERSION).then(cache => {
    		return cache.addAll([
                '/',
                '/assets/css/materialize.min.css',
                '/assets/css/materialize.css',
                '/assets/css/style.css',
                '/assets/js/materialize.min.js',
                '/assets/js/materialize.js',
                '/assets/js/pages.js',
                '/assets/js/notifications.js',
                '/assets/js/map.js',
                '/assets/js/http.js',
                '/assets/js/init.js',
                '/index.html',
                '/views/about.html',
                '/views/canDonate.html',
                '/views/home.html',
                '/views/iHospital.html',
                '/views/login.html',
                '/views/wantDonate.html',
                // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDgXVP7UODM2QZLil_Mm4MXPGxVmnbZIc&callback=myMap'
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







