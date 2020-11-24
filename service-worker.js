const CACHE_NAME = "Yunifootball";
let urlToCache =
  [
    "./",
    "./index.html",
    "./css/materialize.min.css",
    "./css/main.css",
    "./img/favicon.png",
    "./img/favicon-16x16.png",
    "./img/favicon-32x32.png",
    "./img/android-chrome-192x192.png",
    "./img/android-chrome-72x72.png",
    "./img/android-chrome-96x96.png",
    "./img/android-chrome-512x512.png",
    "./img/apple-touch-icon.png",
    "./img/apple-touch-icon-57x57",
    "./img/apple-touch-icon-60x60",
    "./nav.html",
    "./img/logo-white.png",
    "./pages/standing.html",
    "./pages/match.html",
    "./pages/favorite.html",
    "./pages/about.html",
    "./pages/teams.html",
    "./js/materialize.min.js",
    "./js/main.js",
    "./js/nav.js",
    "./register.js",
    "./push.js",
    "./js/api.js",
    "./js/db.js",
    "./js/idb.js",
  ];
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlToCache);
        })
    );
});
 
 
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME){  
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})
 
self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});
 
 
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
 
  var options = {
    body: body,
    icon: "/img/android-chrome-512x512.png",
    vibration: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
 
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});