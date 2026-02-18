const CACHE_NAME = 'af-clean-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação - cache dos arquivos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => console.log('Erro ao cachear:', err))
    );
    self.skipWaiting();
});

// Ativação - limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache se existir
                if (response) {
                    return response;
                }

                // Senão, busca na rede
                return fetch(event.request)
                    .then(networkResponse => {
                        // Não cacheia requisições não-GET ou APIs externas
                        if (event.request.method !== 'GET' || 
                            event.request.url.includes('chrome-extension')) {
                            return networkResponse;
                        }

                        // Clona a resposta para cachear
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // Fallback para offline
                        if (event.request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// Sincronização em background
self.addEventListener('sync', event => {
    if (event.tag === 'sync-clients') {
        event.waitUntil(syncClients());
    }
});

// Notificações push (para lembretes)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Novo lembrete AF Clean!',
        icon: 'icons/icon-192x192.png',
        badge: 'icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: './'
        },
        actions: [
            {
                action: 'open',
                title: 'Abrir App'
            },
            {
                action: 'close',
                title: 'Fechar'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('AF Clean', options)
    );
});

// Clique na notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

async function syncClients() {
    // Lógica de sincronização quando voltar online
    console.log('Sincronizando dados...');
                   }
      
