// console.log("SW.js")
//todos los archivos de la app propios
const APP_SHELL = [
    '/',
    '/index.html',
    'img/gradutation.jpg',
    'js/app.js',
    'css/style.css',
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            cache.addAll(APP_SHELL);
        })
    );

    event.waitUntil(
        caches.open('inmutable-cache').then((cache) => {
            cache.addAll(APP_SHELL_INMUTABLE);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log("Activado");
});

//PRACTICA OFFLINE
//Cuando no haya internet y se solicite el recurso de page2.html, devolver la página offline.html en su lugar.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                if (event.request.url.includes('/pages/pages2.html')) {
                    return caches.match('/pages/offline.html');
                }
            });
        })
    );
});

//self.addEventListener('fetch', (e) => {
    //console.log(e.request);
    

    //1.- cache only
    //e.respondWith(caches.match(e.request));

    //2.- cache with network fallback
    // const source = caches.match(e.request)
    // .then(res=>{
    //     if(res) return res;
    //     return fetch(e.request).then(resFetch=>{
    //         caches.open(DYNAMIC).then(cache=>{
    //             cache.put(e.request, resFetch);
    //         });
    //         return resFetch.clone();
    //     })
    // })
    // e.respondWith(source);

    // 3.- Network with cache fallback
    // const source = fetch(e.request)
    //     .then(res => {
    //         if (!res) throw Error("NotFound");
    //         caches.open(DYNAMIC).then(cache => {
    //             cache.put(e.request, res);
    //         });
    //         return res.clone();
    //     })
    //     .catch((err) => {
    //         return caches.match(e.request);
    //     })
    // e.respondWith(source);

    //4.- cache with network update
    //Primero todo lo devuelve del cache
    //Despues actualiza
    //Rendimiento critico
    // const source = caches.open(STATIC).then(cache =>{
    //     fetch(e.request).then(resFetch=>{
    //         cache.put(e.request, resFetch)
    //     })
    //     return caches.match(e.request);
    // })

    //5.- cache and network race
    // const source = new Promise((resolve, reject)=>{
    //     let flag = false;
    //     if(flag){
            
    //     }else{
    //         flag = true;
    //     }
    // })
    


//});

