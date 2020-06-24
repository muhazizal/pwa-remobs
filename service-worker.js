const CACHE_NAME = 'remobs-test';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/browserconfig.xml',
	'/site.webmanifest',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/price.html',
	'/pages/rent.html',
	'/css/materialize.css',
	'/js/bin/materialize.min.js',
	'/js/bin/nav.js',
	'/assets/background.jpg',
	'/assets/avanza.jpg',
	'/assets/xenia.jpg',
	'/assets/innova.jpg',
	'/assets/icons/android-chrome-192x192.png',
	'/assets/icons/apple-touch-icon.png',
	'/assets/icons/favicon.ico',
	'/assets/icons/mstile-150x150.png',
	'/assets/icons/safari-pinned-tab.svg',
	'/assets/icons/favicon-16x16.png',
	'/assets/icons/favicon-32x32.png',
	'/assets/icons/favicon-72x72.png',
	'/assets/icons/favicon-96x96.png',
	'/assets/icons/favicon-128x128.png',
	'/assets/icons/favicon-144x144.png',
	'/assets/icons/favicon-192x192.png',
	'/assets/icons/favicon-256x256.png',
	'/assets/icons/favicon-384x384.png',
	'/assets/icons/favicon-512x512.png',
	'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
];

// Add asset to cache
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

// Use asset from cache
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request, { cacheName: CACHE_NAME }).then(function (response) {
			if (response) {
				console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
				return response;
			}

			console.log('ServiceWorker: Memuat aset dari server: ', event.request.url);
			return fetch(event.request);
		})
	);
});

// Delete old asset from chace
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
