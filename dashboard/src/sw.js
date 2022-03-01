/* eslint-disable */
importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/6.5.0/workbox-sw.min.js')

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
      .open(workbox.core.cacheNames.precache)
      .then(cache => cache.addAll(Array.from(new Set(precaches.map(c => c.url)))))
      .then(() => self.skipWaiting())
  )
})

workbox.core.clientsClaim()
workbox.precaching.precacheAndRoute(precaches)

const handler = workbox.precaching.createHandlerBoundToURL('/index.html')
const navigationRoute = new workbox.routing.NavigationRoute(handler, {
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
    /\/logout/
  ]
})
workbox.routing.registerRoute(navigationRoute)
