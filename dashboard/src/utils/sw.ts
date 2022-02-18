import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL
} from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { setCacheNameDetails, cacheNames } from 'workbox-core'

setCacheNameDetails({
  prefix: 'heyform',
  suffix: `v2022.1`,
  precache: 'precache',
  runtime: 'runtime'
})

const __INDEX_HTML_CACHE = [{ url: '/index.html' }]
const precaches = __INDEX_HTML_CACHE.concat(self.__WB_MANIFEST || [])

// Skip waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Install: open cache and add all dependencies.
// Optional: skip waiting and activate immediately.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheNames.precache)
      .then(cache => cache.addAll(Array.from(new Set(precaches.map(c => c.url)))))
      .then(() => self.skipWaiting())
  )
})

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), {
    denylist: [
      /\/sw\.js$/,

      // Public form
      /\/f\/[^\/]+$/,
      /\/f\/[^\/]+\/(e\.js)$/i,
      /\/go\/[^\/]+$/,
      /\/go\/[^\/]+\/(e\.js)$/i,

      // Embed form
      /\/embed.*$/,

      // Open App authorize
      /\/oauth\/authorize\/.*$/i,

      /\/export\/submissions[^\/]+$/,
      /\/connect\/.*$/,
      /\/reset\/.*$/,
      /\/verify\/.*$/,
      /\/logout/
    ]
  })
)
