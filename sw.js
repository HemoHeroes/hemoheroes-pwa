const VERSION = 'hemoheroes@v2-'+new Date().getMilliseconds();

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject) => {
    	caches.open(VERSION).then(cache => {
    		return cache.addAll([
                '/',
                '/index.html',
                '/templates/map.html',
                '/404.html',
                '/css/style.css',
                '/js/main.js',
                '/bower_components/angular/angular.min.js',
                '/bower_components/angular-route/angular-route.min.js',
                '/bower_components/ngmap/build/scripts/ng-map.min.js'
    		]).then(_ => {
    			console.log('INSTALLED ' + VERSION);
        		resolve();
    		}).catch(err => {
    			console.erro('Não deu!', err);
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
        			// return caches.match(errorPage)
        		}
        	})
        }).catch(
            x => {
                console.log("X", x)
                // return caches.match(errorPage)
            }
        )
    )
});







